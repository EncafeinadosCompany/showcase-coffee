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

// Función para crear una imagen de placeholder usando SVG
const createPlaceholderImage = () => {
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f3e5d8"/>
      <text x="100" y="100" font-family="Arial" font-size="14" fill="#8b7355" text-anchor="middle">
        Imagen no disponible
      </text>
      <path d="M85,80 C85,80 115,80 115,80 C125,80 125,90 125,90 L125,110 C125,110 125,120 115,120 L85,120 C75,120 75,110 75,110 L75,90 C75,90 75,80 85,80" fill="#8b7355"/>
      <circle cx="100" cy="100" r="10" fill="#f3e5d8"/>
    </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const generateProductPdf = (product: Product) => {
  const doc = new jsPDF();
  
  // Define colors
  const primaryColor = "#582f0e";
  const secondaryColor = "#db8935";
  const textColor = "#713f12";
  const backgroundColor = "#f3e5d8";
  
  // Header
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor("#ffffff");
  doc.setFontSize(24);
  doc.text("FICHA TÉCNICA", 105, 20, { align: "center" });
  
  // Product name and brand
  doc.setTextColor(primaryColor);
  doc.setFontSize(20);
  doc.text(product.product_name, 105, 50, { align: "center" });
  
  if (product.brand) {
    doc.setFontSize(14);
    doc.text(product.brand.name, 105, 60, { align: "center" });
    doc.setFontSize(12);
    doc.text(product.brand.description, 105, 68, { align: "center" });
  }

  // Description section (new)
  let currentY = 80;
  if (product.description) {
    doc.setFillColor(secondaryColor);
    doc.rect(20, currentY - 5, 170, 10, "F");
    doc.setTextColor("#ffffff");
    doc.setFontSize(14);
    doc.text("DESCRIPCIÓN", 105, currentY, { align: "center" });
    
    doc.setTextColor(textColor);
    doc.setFontSize(12);
    const description = doc.splitTextToSize(product.description, 150);
    currentY += 15;
    doc.text(description, 20, currentY);
    currentY += (description.length * 7) + 10;
  }
  
  // Image section with placeholder
  doc.setFillColor(backgroundColor);
  doc.rect(20, currentY, 80, 80, "F");
  
  if (product.imagen) {
    try {
      const img = new Image();
      img.src = product.imagen;
      doc.addImage(img, "JPEG", 20, currentY, 80, 80);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Si falla la carga de la imagen, usar el placeholder
      const placeholderImg = createPlaceholderImage();
      doc.addImage(placeholderImg, "PNG", 20, currentY, 80, 80);
    }
  } else {
    // Si no hay imagen, usar el placeholder
    const placeholderImg = createPlaceholderImage();
    doc.addImage(placeholderImg, "PNG", 20, currentY, 80, 80);
  }
  
  if (product.attributes && product.attributes.length > 0) {
    let attrY = currentY + 90; // Ajusta la posición vertical para que no se superponga con la imagen
    
    doc.setFillColor(secondaryColor);
    doc.rect(110, attrY - 5, 80, 10, "F");
    doc.setTextColor("#ffffff");
    doc.setFontSize(14);
    doc.text("CARACTERÍSTICAS", 150, attrY, { align: "center" });
    
    doc.setTextColor(textColor);
    doc.setFontSize(11);
    attrY += 15;
    
    // Mostrar cada atributo en una línea separada
    product.attributes.forEach((attr) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${attr.description}:`, 110, attrY);
      doc.setFont("helvetica", "normal");
      
      // Dividir el valor del atributo en varias líneas si es demasiado largo
      const valueLines = doc.splitTextToSize(attr.attributes_products.value, 80);
      doc.text(valueLines, 110, attrY + 5);
      
      // Ajustar la posición vertical para el siguiente atributo
      attrY += 10 + (valueLines.length * 5); // Incrementar el espacio según el número de líneas
    });
  }
  
  // Variants section
  const variantsYPos = currentY + 100;
  doc.setFillColor(secondaryColor);
  doc.rect(20, variantsYPos - 5, 170, 10, "F");
  doc.setTextColor("#ffffff");
  doc.setFontSize(14);
  doc.text("PRESENTACIONES DISPONIBLES", 105, variantsYPos, { align: "center" });
  
  let currentVariantY = variantsYPos + 15;
  doc.setTextColor(textColor);
  doc.setFontSize(12);
  
  // Crear una tabla para las variantes
  product.variants.forEach((variant) => {
    doc.setFont("helvetica", "bold");
    doc.text(`Presentación ${variant.grammage}g`, 20, currentVariantY);
    doc.setFont("helvetica", "normal");
    doc.text(`Stock: ${variant.stock} unidades`, 120, currentVariantY);
    currentVariantY += 10;
  });
  
  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFillColor(primaryColor);
  doc.rect(0, pageHeight - 20, 210, 20, "F");
  doc.setTextColor("#ffffff");
  doc.setFontSize(10);
  doc.text(
    `Generado el ${new Date().toLocaleDateString()}`,
    105,
    pageHeight - 10,
    { align: "center" }
  );
  
  // Save the PDF
  doc.save(`${product.product_name}_ficha_tecnica.pdf`);
};