import jsPDF from "jspdf";
import { Product } from '@/types/products/PDF';

export const generateProductPdf = async (product: Product) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const colors = {
    primary: "#582f0e",
    secondary: "#db8935",
    text: "#333333",
    lightGray: "#f5f5f5",
    white: "#ffffff",
    error: "#FFA07A",
    cardBorder: "#d3d3d3",    // Gris claro para bordes
    cardBg: "#ffffff"         // Fondo blanco para las tarjetas
  };

  const fonts = {
    title: 24,
    subtitle: 18,
    heading: 14,
    normal: 12,
    small: 10
  };

  const spacing = {
    margin: 20,
    lineHeight: 7,
    sectionGap: 15
  };

  let currentY = 0;
  const pageWidth = doc.internal.pageSize.width;
  const contentWidth = pageWidth - (spacing.margin * 2);
  const headerHeight = 35; // Altura del encabezado

  // Función modificada para añadir una nueva página
  const addNewPage = () => {
    doc.addPage();
    addHeaderToPage(); // Primero añadir el encabezado
    currentY = headerHeight + 15; // Establecer currentY por debajo del encabezado
  };

  // Función mejorada para verificar saltos de página
  const checkPageBreak = (neededSpace: number) => {
    const pageHeight = doc.internal.pageSize.height;
    const footerHeight = 20; // Altura del pie de página
    const availableSpace = pageHeight - footerHeight - currentY;
    
    if (availableSpace < neededSpace) {
      addNewPage();
      return true;
    }
    return false;
  };

  const addHeaderToPage = () => {
    doc.setFillColor(colors.primary);
    doc.rect(0, 0, pageWidth, headerHeight, "F");
    doc.setFillColor(colors.white);

    doc.setTextColor(colors.white);
    doc.setFontSize(fonts.title);
    doc.setFont("helvetica", "bold");
    doc.text("FICHA TÉCNICA", pageWidth / 2, 25, { align: "center" });
  };

  const addSectionTitle = (title: string) => {
    // Verificar si hay espacio suficiente para el título de sección
    if (checkPageBreak(20)) return; // Si se añadió una nueva página, salir
    
    doc.setFillColor(colors.secondary);
    doc.setDrawColor(colors.secondary);
    doc.roundedRect(spacing.margin, currentY, contentWidth, 10, 2, 2, "F");
    doc.setTextColor(colors.white);
    doc.setFontSize(fonts.heading);
    doc.setFont("helvetica", "bold");
    doc.text(title, spacing.margin + 5, currentY + 7);
    currentY += 14;
  };

  const addEmptyStateMessage = (message: string) => {
    // Verificar espacio para el mensaje de estado vacío
    if (checkPageBreak(25)) return;
    
    doc.setFillColor(colors.lightGray);
    doc.roundedRect(spacing.margin, currentY - 5, contentWidth, 20, 2, 2, "F");
    
    doc.setTextColor(colors.text);
    doc.setFontSize(fonts.normal);
    doc.setFont("helvetica", "italic");
    doc.text(message, pageWidth / 2, currentY + 5, { align: "center" });
    
    currentY += 25;
  };

  // Inicializar la primera página
  addHeaderToPage();
  currentY = headerHeight + 15; // Iniciar por debajo del encabezado

  if (!product.product_name && !product.brand?.name) {
    doc.setTextColor(colors.primary);
    doc.setFontSize(fonts.subtitle);
    doc.setFont("helvetica", "bold");
    doc.text("Producto Sin Información", spacing.margin, currentY);
    currentY += 6;
    addEmptyStateMessage("No se ha proporcionado información básica del producto");
  } else {
    doc.setTextColor(colors.primary);
    doc.setFontSize(fonts.subtitle);
    doc.setFont("helvetica", "bold");
    doc.text(product.product_name || "Nombre no disponible", spacing.margin, currentY);

    if (product.brand) {
      currentY += 8;
      doc.setFontSize(fonts.normal);
      doc.setFont("helvetica", "normal");
      doc.text(`Marca: ${product.brand.name || "No disponible"}`, spacing.margin, currentY);
    }
  }

  currentY += spacing.sectionGap;
  const imageSize = 75;
  
  // Verificar espacio para la imagen
  if (checkPageBreak(imageSize + 10)) return;
  
  try {
    const DefectImage = "https://res.cloudinary.com/dllvnidd5/image/upload/v1740162681/images-coffee/1740162774098-coffee%20bean-pana.png.png"
    const imageUrl = product.imagen || DefectImage;
    const img = new Image();
    img.src = imageUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    doc.setDrawColor(colors.lightGray);
    doc.setFillColor(colors.white);
    doc.roundedRect(spacing.margin - 1, currentY - 1, imageSize + 2, imageSize + 2, 3, 3, "FD");
    doc.addImage(img, "JPEG", spacing.margin, currentY, imageSize, imageSize);
  } catch (error) {
    doc.setFillColor(colors.lightGray);
    doc.roundedRect(spacing.margin - 1, currentY - 1, imageSize + 2, imageSize + 2, 3, 3, "F");
    
    doc.setTextColor(colors.text);
    doc.setFontSize(fonts.small);
    doc.setFont("helvetica", "italic");
    doc.text("Imagen no\ndisponible", spacing.margin + imageSize/2, currentY + imageSize/2, {
      align: "center",
      baseline: "middle"
    });
    throw new Error(`Error: ${error}`);
  }

  const descriptionX = spacing.margin + imageSize + 10;
  const descriptionWidth = contentWidth - imageSize - 10;

  doc.setTextColor(colors.primary);
  doc.setFontSize(fonts.heading);
  doc.setFont("helvetica", "bold");
  doc.text("Descripción de la Marca", descriptionX, currentY);

  currentY += 10;

  if (!product.brand?.description) {
    doc.setTextColor(colors.text);
    doc.setFontSize(fonts.normal);
    doc.setFont("helvetica", "italic");
    doc.text("Descripción no disponible", descriptionX, currentY + 10);
  } else {
    doc.setTextColor(colors.text);
    doc.setFontSize(fonts.normal);
    doc.setFont("helvetica", "normal");
    const descriptionLines = doc.splitTextToSize(product.brand.description, descriptionWidth);
    
    // Calcular si hay suficiente espacio para la descripción
    const neededSpace = descriptionLines.length * spacing.lineHeight;
    if (checkPageBreak(neededSpace)) {
      // Si se añadió una nueva página, volver a imprimir el título
      doc.setTextColor(colors.primary);
      doc.setFontSize(fonts.heading);
      doc.setFont("helvetica", "bold");
      doc.text("Descripción de la Marca", spacing.margin, currentY);
      currentY += 10;
    }
    
    doc.text(descriptionLines, descriptionX, currentY + 10);
    // Actualizar currentY basado en la altura real del texto
    currentY += Math.max(70, descriptionLines.length * spacing.lineHeight + 15);
  }

  // Añadir sección de características
  addSectionTitle("CARACTERÍSTICAS DEL PRODUCTO");
  
  if (!product.attributes || product.attributes.length === 0) {
    addEmptyStateMessage("No hay características registradas para este producto");
  } else {
    product.attributes.forEach((attr, index) => {
      // Verificar espacio para cada característica
      if (checkPageBreak(20)) return;

      const isEven = index % 2 === 0;
      doc.setFillColor(isEven ? colors.lightGray : colors.white);
      doc.rect(spacing.margin, currentY - 5, contentWidth, 15, "F");

      doc.setTextColor(colors.text);
      doc.setFontSize(fonts.normal);
      doc.setFont("helvetica", "bold");
      doc.text(`${attr.description || "Sin nombre"}:`, spacing.margin + 5, currentY + 3);
      doc.setFont("helvetica", "normal");
      
      const value = attr.attributes_products.value || "Valor no especificado";
      const valueLines = doc.splitTextToSize(value, contentWidth - 70);
      
      // Si el texto es demasiado largo, verificar salto de página nuevamente
      const textHeight = valueLines.length * spacing.lineHeight;
      if (textHeight > 15 && checkPageBreak(textHeight)) {
        // Si se añadió nueva página, re-dibujar la fila
        doc.setFillColor(isEven ? colors.lightGray : colors.white);
        doc.rect(spacing.margin, currentY - 5, contentWidth, textHeight, "F");
        doc.setTextColor(colors.text);
        doc.setFontSize(fonts.normal);
        doc.setFont("helvetica", "bold");
        doc.text(`${attr.description || "Sin nombre"}:`, spacing.margin + 5, currentY + 3);
        doc.setFont("helvetica", "normal");
      }
      
      doc.text(valueLines, spacing.margin + 70, currentY + 3);
      currentY += Math.max(20, valueLines.length * spacing.lineHeight);
    });
  }

  // Sección de presentaciones disponibles con diseño de tarjetas minimalistas
  checkPageBreak(40);
  addSectionTitle("PRESENTACIONES DISPONIBLES");

  if (!product.variants || product.variants.length === 0) {
    addEmptyStateMessage("No hay presentaciones disponibles para este producto");
  } else {
    // Configuración para tarjetas de presentaciones con estilo minimalista
    const cardsPerRow = 3;
    const cardWidth = contentWidth / cardsPerRow;
    const cardHeight = 45;
    const cardMargin = 5;
    
    // Calcular cuántas filas se necesitarán
    const totalVariants = product.variants.length;
    const rows = Math.ceil(totalVariants / cardsPerRow);
    
    // Verificar espacio para la primera fila de tarjetas
    if (checkPageBreak(cardHeight + 10)) return;
    
    let variantIndex = 0;
    
    // Dibujar las tarjetas en filas
    for (let row = 0; row < rows; row++) {
      // Verificar si hay espacio para la siguiente fila
      if (row > 0 && checkPageBreak(cardHeight + 10)) continue;
      
      for (let col = 0; col < cardsPerRow; col++) {
        if (variantIndex >= totalVariants) break;
        
        const variant = product.variants[variantIndex];
        variantIndex++;
        
        const x = spacing.margin + (col * cardWidth);
        const y = currentY;
        
        // Dibujar tarjeta con estilo minimalista
        // Fondo blanco con borde fino
        doc.setFillColor(colors.cardBg);
        doc.setDrawColor(colors.cardBorder);
        doc.roundedRect(x + cardMargin, y, cardWidth - (cardMargin * 2), cardHeight, 4, 4, "FD");
        
        // Línea horizontal decorativa en la parte superior
        doc.setDrawColor(colors.secondary);
        doc.setLineWidth(0.5);
        doc.line(
          x + cardMargin + 5, 
          y + 12, 
          x + cardWidth - cardMargin - 5, 
          y + 12
        );
        
        // Añadir etiqueta "PRESENTACIÓN"
        doc.setTextColor(colors.primary);
        doc.setFontSize(fonts.small);
        doc.setFont("helvetica", "bold");
        doc.text("PRESENTACIÓN", x + (cardWidth / 2), y + 8, {
          align: "center"
        });
        
        // Añadir texto de gramaje con estilo elegante
        doc.setTextColor(colors.secondary);
        doc.setFontSize(fonts.title - 4); // Tamaño grande pero no excesivo
        doc.setFont("helvetica", "bold");
        const gramaje = variant.grammage ? `${variant.grammage}g` : "N/A";
        doc.text(gramaje, x + (cardWidth / 2), y + 25, {
          align: "center",
          baseline: "middle"
        });
      }
      
      // Avanzar a la siguiente fila
      currentY += cardHeight + 15;
    }
  }

  const addFooter = (pageNumber: number) => {
    const totalPages = doc.getNumberOfPages();
    const pageHeight = doc.internal.pageSize.height;
    
    doc.setFillColor(colors.primary);
    doc.rect(0, pageHeight - 20, pageWidth, 20, "F");
    
    doc.setTextColor(colors.white);
    doc.setFontSize(fonts.small);
    doc.setFont("helvetica", "normal");
    
    const footerText = `Generado el ${new Date().toLocaleDateString()} | Página ${pageNumber} de ${totalPages}`;
    doc.text(footerText, pageWidth / 2, pageHeight - 8, { align: "center" });
  };

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i);
  }

  doc.save(`${product.product_name || "producto"}_ficha_tecnica.pdf`);
};