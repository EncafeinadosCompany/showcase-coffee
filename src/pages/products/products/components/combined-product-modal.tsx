"use client"

import { type FC, useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Coffee, Download, Package, Scale, Sparkles, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { getID } from "@/features/products/products/productSlice"

interface Variant {
  grammage: string
  stock: number
}

interface Attribute {
  id?: number
  description: string
  value?: string
  attributes_products?: { value: string }
}

interface CombinedModalProps {
  isOpen?: boolean
  onClose?: () => void
  variants: Variant[]
  attributes: Attribute[]
  product_name: string
  productId: string | number
  imagen?: string
}

const getIconForAttribute = (description: string) => {
  const lowerDesc = description.toLowerCase()
  if (lowerDesc.includes("aroma") || lowerDesc.includes("sabor")) return Coffee
  if (lowerDesc.includes("calidad") || lowerDesc.includes("premium")) return Star
  if (lowerDesc.includes("origen") || lowerDesc.includes("variedad")) return Sparkles
  return Award
}

const CombinedProductModal: FC<CombinedModalProps> = ({
  isOpen,
  onClose,
  variants,
  attributes,
  product_name,
  productId,
  imagen,
}) => {
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state: any) => state.products)
  const [hoveredVariant, setHoveredVariant] = useState<Variant | null>(null)
  const [productDetails, setProductDetails] = useState<any>(null)
  const [internalOpen, setInternalOpen] = useState(false)

  // Handle controlled or uncontrolled modal state
  const isControlled = isOpen !== undefined && onClose !== undefined
  const isModalOpen = isControlled ? isOpen : internalOpen
  const handleClose = isControlled ? onClose : () => setInternalOpen(false)

  useEffect(() => {
    if (productDetails) {
      generateProductPdf(productDetails)
    }
  }, [productDetails])

  const handleDownloadPDF = async () => {
    const ProductId = productId

    try {
      const data = await dispatch(getID(ProductId.toString())).unwrap()

      const pdfData = {
        product_name: data.name || product_name,
        imagen: data.image_url || imagen,
        variants: data.product || [],
        brand: data.brand || {},
        attributes: data.attributes || [],
      }

      setProductDetails(pdfData)
    } catch (error) {
      alert(`Error al generar el PDF. Por favor, inténtalo de nuevo. ${error}`)
    }
  }

  // Mock function for PDF generation (replace with actual implementation)
  const generateProductPdf = (data: any) => {
    console.log("Generating PDF with data:", data)
    // Implement actual PDF generation here
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      {!isControlled && (
        <DialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-full h-19 py-2 px-6 bg-gradient-to-r bg-white text-amber-950 justify-center border-gray-300 border-[0.01px] text-xs font-medium hover:from-gray-100 hover:to-gray-200 flex items-center gap-2 rounded-xl shadow-lg transition-all"
          >
            <Coffee className="h-4 w-4 text-yellow-700" />
            Ver Detalles del Producto
          </motion.button>
        </DialogTrigger>
      )}

      <DialogContent
        aria-describedby="descripcion-del-producto"
        className="p-0 max-w-4xl bg-[#faf6f1] h-[calc(100vh-80px)] flex flex-col overflow-hidden"
      >
        <DialogHeader className="p-6 pb-0 mt-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-[#582f0e] flex items-center gap-2">
                <Coffee className="h-6 w-6 sm:h-8 sm:w-8 text-[#582f0e]" />
                {product_name}
              </DialogTitle>

              <Button
                variant="outline"
                className="w-fit text-[#582f0e] hover:bg-[#582f0e] hover:text-white transition-colors rounded-full"
                onClick={handleDownloadPDF}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" />
                {isLoading ? "Cargando..." : "Ficha técnica PDF"}
              </Button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="border-b border-[#e8d5c4]"></div>
          </div>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 py-4 px-4 sm:px-7 flex-1 overflow-hidden">
          <div className="flex-shrink-0 w-full md:w-1/2 h-48 sm:h-auto relative overflow-hidden rounded-2xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#db8935] to-[#582f0e] opacity-20"></div>
            {imagen ? (
              <img src={imagen || "/placeholder.svg"} alt={product_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#f3e5d8]">
                <Coffee className="h-20 w-20 sm:h-32 sm:w-32 text-[#8b7355]" />
              </div>
            )}
            <AnimatePresence>
              {hoveredVariant && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4"
                >
                  <p className="text-xl sm:text-2xl font-bold">{hoveredVariant.grammage}</p>
                  <p className="text-xs sm:text-sm">Stock: {hoveredVariant.stock} unidades</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs defaultValue="variants" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="variants" className="text-amber-800">
                  Presentaciones
                </TabsTrigger>
                <TabsTrigger value="attributes" className="text-amber-800">
                  Atributos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="variants" className="h-[calc(60vh-80px)]">
                <ScrollArea className="h-full pr-2">
                  <div className="space-y-4">
                    {variants.length > 0 ? (
                      variants.map((variant, index) => (
                        <motion.div
                          key={`${variant.grammage}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-white shadow-lg rounded-xl border-l-4 border-[#db8935] hover:shadow-xl transition-all"
                          onMouseEnter={() => setHoveredVariant(variant)}
                          onMouseLeave={() => setHoveredVariant(null)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-[#db8935] rounded-full p-2">
                                <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                              </div>
                              <span className="text-[#713f12] font-bold text-lg sm:text-xl">{variant.grammage}</span>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-[#582f0e] text-white border-none px-2 sm:px-3 py-1 text-xs sm:text-sm"
                            >
                              Stock: {variant.stock}
                            </Badge>
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-[#8b7355]">
                            <Package className="h-4 w-4" />
                            <span className="text-xs sm:text-sm">Presentación de {variant.grammage} gramos</span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex content-center justify-center items-center h-32">
                        <span className="text-[#713f12] text-xl">No hay presentaciones disponibles</span>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="attributes" className="h-[calc(60vh-80px)]">
                <ScrollArea className="h-full pr-2">
                  <div className="space-y-4">
                    {attributes?.length ? (
                      attributes.map((attr, index) => {
                        const Icon = getIconForAttribute(attr.description)
                        return (
                          <motion.div
                            key={`${attr.id || index}-attr`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-4 bg-white shadow-lg rounded-xl border-l-4 border-[#db8935] hover:shadow-xl transition-all"
                          >
                            <div className="bg-gradient-to-r from-amber-400 to-yellow-400 p-2 rounded-full">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-amber-800">{attr.description}</h3>
                              <Badge className="mt-1 bg-[#faf6f1] text-amber-950 hover:bg-amber-200 rounded-2xl">
                                {attr.attributes_products?.value || attr.value || "N/A"}
                              </Badge>
                            </div>
                          </motion.div>
                        )
                      })
                    ) : (
                      <div className="flex content-center justify-center items-center h-32">
                        <span className="text-amber-800 text-center italic">
                          No hay atributos disponibles para este producto.
                        </span>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CombinedProductModal

