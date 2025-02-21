import jsPDF from "jspdf";
import { Product } from '@/types/products/PDF';

export const generateProductPdf = async (product: Product) => {
  // Initialize PDF in A4 format
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Design constants
  const colors = {
    primary: "#582f0e",
    secondary: "#db8935",
    text: "#333333",
    lightGray: "#f5f5f5",
    white: "#ffffff"
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

  // Helper functions
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
    // Section title background
    doc.setFillColor(colors.secondary);
    doc.setDrawColor(colors.secondary);
    doc.roundedRect(spacing.margin, currentY, contentWidth, 10, 2, 2, "F");
    
    // Title text
    doc.setTextColor(colors.white);
    doc.setFontSize(fonts.heading);
    doc.setFont("helvetica", "bold");
    doc.text(title, spacing.margin + 5, currentY + 7);
    currentY += 15;
  };

  // Start PDF Generation
  addHeaderToPage();
  currentY = 50;

  // Product name and brand
  doc.setTextColor(colors.primary);
  doc.setFontSize(fonts.subtitle);
  doc.setFont("helvetica", "bold");
  doc.text(product.product_name || "Nombre del producto no disponible", spacing.margin, currentY);

  if (product.brand) {
    currentY += 8;
    doc.setFontSize(fonts.normal);
    doc.setFont("helvetica", "normal");
    doc.text(`Marca: ${product.brand.name || "No disponible"}`, spacing.margin, currentY);
  }

  // Image and Description in two columns
  currentY += spacing.sectionGap;
  const imageSize = 80;
  
  try {
    const imageUrl = product.imagen || "https://res.cloudinary.com/dllvnidd5/image/upload/v1740162681/images-coffee/1740162774098-coffee%20bean-pana.png.png";
    const img = new Image();
    img.src = imageUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Image container with shadow effect
    doc.setDrawColor(colors.lightGray);
    doc.setFillColor(colors.white);
    doc.roundedRect(spacing.margin - 1, currentY - 1, imageSize + 2, imageSize + 2, 3, 3, "FD");
    doc.addImage(img, "JPEG", spacing.margin, currentY, imageSize, imageSize);
  } catch (error) {
    console.error("Error al cargar la imagen:", error);
  }

  // Description next to image
  if (product.description) {
    const descriptionX = spacing.margin + imageSize + 10;
    const descriptionWidth = contentWidth - imageSize - 10;
    
    doc.setTextColor(colors.text);
    doc.setFontSize(fonts.normal);
    doc.setFont("helvetica", "normal");
    const descriptionLines = doc.splitTextToSize(product.description, descriptionWidth);
    doc.text(descriptionLines, descriptionX, currentY + 10);
  }

  currentY += imageSize + spacing.sectionGap;

  // Attributes
  if ((product.attributes ?? []).length > 0) {
    addSectionTitle("CARACTERÍSTICAS DEL PRODUCTO");
    
    (product.attributes ?? []).forEach((attr, index) => {
      if (checkPageBreak(20)) return;

      // Attribute box with alternating background
      const isEven = index % 2 === 0;
      doc.setFillColor(isEven ? colors.lightGray : colors.white);
      doc.rect(spacing.margin, currentY - 5, contentWidth, 15, "F");

      // Attribute name and value
      doc.setTextColor(colors.text);
      doc.setFontSize(fonts.normal);
      doc.setFont("helvetica", "bold");
      doc.text(`${attr.description || ""}:`, spacing.margin + 5, currentY + 3);
      doc.setFont("helvetica", "normal");
      
      const valueLines = doc.splitTextToSize(attr.attributes_products.value || "", contentWidth - 70);
      doc.text(valueLines, spacing.margin + 70, currentY + 3);
      
      currentY += Math.max(20, valueLines.length * spacing.lineHeight);
    });
  }

  // Variants
  if (product.variants?.length > 0) {
    checkPageBreak(40);
    addSectionTitle("PRESENTACIONES DISPONIBLES");

    // Table header
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

    // Table content
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

  // Footer on each page
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

  // Add footer to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i);
  }

  // Save the PDF
  doc.save(`${product.product_name || "producto"}_ficha_tecnica.pdf`);
};