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
    error: "#FFA07A" 
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

  const addNewPage = () => {
    doc.addPage();
    currentY = spacing.margin;
    addHeaderToPage();
  };

  const checkPageBreak = (neededSpace: number) => {
    if (currentY + neededSpace > doc.internal.pageSize.height - 30) {
      addNewPage();
      return true;
    }
    return false;
  };

  const addHeaderToPage = () => {
    doc.setFillColor(colors.primary);
    doc.rect(0, 0, pageWidth, 35, "F");
    doc.setFillColor(colors.white);

    doc.setTextColor(colors.white);
    doc.setFontSize(fonts.title);
    doc.setFont("helvetica", "bold");
    doc.text("FICHA TÉCNICA", pageWidth / 2, 25, { align: "center" });
  };

  const addSectionTitle = (title: string) => {
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
    doc.setFillColor(colors.lightGray);
    doc.roundedRect(spacing.margin, currentY - 5, contentWidth, 20, 2, 2, "F");
    
    doc.setTextColor(colors.text);
    doc.setFontSize(fonts.normal);
    doc.setFont("helvetica", "italic");
    doc.text(message, pageWidth / 2, currentY + 5, { align: "center" });
    
    currentY += 25;
  };

  addHeaderToPage();
  currentY = 50;

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
  
  try {
    const DefectImage = "https://res.cloudinary.com/dllvnidd5/image/upload/v1740162681/images-coffee/1740162774098-coffee%20bean-pana.png.png"
    const imageUrl = product.imagen || DefectImage ;
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
  const descriptionWidth = contentWidth - imageSize - 7;

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
    doc.text(descriptionLines, descriptionX, currentY + 10);
  }

  currentY += 70;

  addSectionTitle("CARACTERÍSTICAS DEL PRODUCTO");
  
  if (!product.attributes || product.attributes.length === 0) {
    addEmptyStateMessage("No hay características registradas para este producto");
  } else {
    product.attributes.forEach((attr, index) => {
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
      doc.text(valueLines, spacing.margin + 70, currentY + 3);
      
      currentY += Math.max(20, valueLines.length * spacing.lineHeight);
    });
  }

  checkPageBreak(40);
  addSectionTitle("PRESENTACIONES DISPONIBLES");

  if (!product.variants || product.variants.length === 0) {
    addEmptyStateMessage("No hay presentaciones disponibles para este producto");
  } else {
    const columns = ["Presentación", "Stock", "Código"];
    const columnWidths = [80, 40, 60];
    
    doc.setFillColor(colors.primary);
    doc.rect(spacing.margin, currentY - 5, contentWidth, 15, "F");
    
    doc.setTextColor(colors.white);
    doc.setFontSize(fonts.normal);
    doc.setFont("helvetica", "bold");
    
    let xOffset = spacing.margin + 5;
    columns.forEach((col, i) => {
      doc.text(col, xOffset, currentY);
      xOffset += columnWidths[i];
    });
    
    currentY += 10;

    product.variants.forEach((variant, index) => {
      if (checkPageBreak(15)) return;

      const isEven = index % 2 === 0;
      doc.setFillColor(isEven ? colors.lightGray : colors.white);
      doc.rect(spacing.margin, currentY - 5, contentWidth, 10, "F");

      doc.setTextColor(colors.text);
      doc.setFontSize(fonts.normal);
      doc.setFont("helvetica", "normal");

      xOffset = spacing.margin + 5;
      doc.text(`${variant.grammage || "N/A"}g`, xOffset, currentY);
      xOffset += columnWidths[0];
      doc.text(`${variant.stock || 0} unidades`, xOffset, currentY);
      xOffset += columnWidths[1];


      currentY += 10;
    });
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