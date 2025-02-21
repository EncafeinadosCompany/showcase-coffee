import jsPDF from "jspdf";

interface Attribute {
  description: string;
  attributes_products: {
    value: string;
  };
}

interface Brand {
  name: string;
  description: string;
}

interface ProductVariant {
  grammage: string;
  stock: number;
  id_product: number | string;
}

interface Product {
  product_name: string;
  imagen?: string;
  variants: ProductVariant[];
  brand?: Brand;
  attributes?: Attribute[];
  description?: string;
}

export const generateProductPdf = async (product: Product) => {
  const doc = new jsPDF();

  // Define colors
  const primaryColor = "#582f0e"; // Color principal (café oscuro)
  const secondaryColor = "#db8935"; // Color secundario (café claro)
  const textColor = "#713f12"; // Color de texto

  // Margins
  const margin = 20;
  let currentY = margin;

  // Header
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 40, "F"); // Rectángulo de fondo para el encabezado

  doc.setTextColor("#ffffff");
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("FICHA TÉCNICA", 105, 25, { align: "center" });

  // Product name and brand
  currentY += 40; // Espacio después del encabezado
  doc.setTextColor(primaryColor);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(product.product_name || "Nombre del producto no disponible", margin, currentY);

  if (product.brand) {
    currentY += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Marca: ${product.brand.name || "Marca no disponible"}`, margin, currentY);
  }

  // Image section
  currentY += 20; // Espacio antes de la imagen
  const imageWidth = 80;
  const imageHeight = 80;
  const imageX = margin;
  const imageY = currentY;

  try {
    // Usar la imagen del producto o el placeholder por defecto
    const imageUrl = product.imagen || "/public/coffee bean-pana.svg";

    const img = new Image();
    img.src = imageUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Agrega la imagen con un borde sutil
    doc.setDrawColor(secondaryColor);
    doc.setLineWidth(0.5);
    doc.rect(imageX, imageY, imageWidth, imageHeight);
    doc.addImage(img, "JPEG", imageX + 2, imageY + 2, imageWidth - 4, imageHeight - 4); // Ajusta el tamaño para el borde
  } catch (error) {
    console.error("Error al cargar la imagen:", error);
    // Si falla la carga de la imagen, usa el placeholder
    const placeholderImg = "/placeholder.svg";
    doc.addImage(placeholderImg, "JPEG", imageX, imageY, imageWidth, imageHeight);
  }

  // Description section
  currentY += imageHeight + 15; // Espacio después de la imagen
  if (product.description) {
    doc.setFillColor(secondaryColor);
    doc.rect(margin, currentY - 5, 170, 10, "F"); // Fondo para el título de la descripción
    doc.setTextColor("#ffffff");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("DESCRIPCIÓN", margin + 5, currentY);

    currentY += 10;
    doc.setTextColor(textColor);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const description = doc.splitTextToSize(product.description, 170); // Ajusta el ancho del texto
    doc.text(description, margin, currentY);
    currentY += description.length * 7 + 10; // Ajusta el espacio según el número de líneas
  }

  // Attributes section
  if (product.attributes && product.attributes.length > 0) {
    doc.setFillColor(secondaryColor);
    doc.rect(margin, currentY - 5, 170, 10, "F"); // Fondo para el título de los atributos
    doc.setTextColor("#ffffff");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("CARACTERÍSTICAS", margin + 5, currentY);

    currentY += 10;
    doc.setTextColor(textColor);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    product.attributes.forEach((attr) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${attr.description || "Atributo no disponible"}:`, margin, currentY);
      doc.setFont("helvetica", "normal");

      const valueLines = doc.splitTextToSize(attr.attributes_products.value || "Valor no disponible", 170);
      doc.text(valueLines, margin + 20, currentY + 5);
      currentY += valueLines.length * 7 + 10; // Ajusta el espacio según el número de líneas
    });
  }

  // Variants section
  doc.setFillColor(secondaryColor);
  doc.rect(margin, currentY - 5, 170, 10, "F"); // Fondo para el título de las variantes
  doc.setTextColor("#ffffff");
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PRESENTACIONES DISPONIBLES", margin + 5, currentY);

  currentY += 10;
  doc.setTextColor(textColor);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  product.variants.forEach((variant) => {
    doc.setFont("helvetica", "bold");
    doc.text(`• ${variant.grammage || "N/A"}g`, margin, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(`Stock: ${variant.stock || 0} unidades`, margin + 50, currentY);
    currentY += 10;
  });

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFillColor(primaryColor);
  doc.rect(0, pageHeight - 20, 210, 20, "F"); // Rectángulo de fondo para el pie de página
  doc.setTextColor("#ffffff");
  doc.setFontSize(10);
  doc.text(
    `Generado el ${new Date().toLocaleDateString()}`,
    105,
    pageHeight - 10,
    { align: "center" }
  );

  // Save the PDF
  doc.save(`${product.product_name || "producto"}_ficha_tecnica.pdf`);
};