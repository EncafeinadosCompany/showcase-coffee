import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { fetchAttributes, addAttribute } from "@/features/products/attributes/attributeSlice"
import { addProducts, fetchProducts } from "@/features/products/products/productSlice"
import { fetchBrands } from "@/features/products/brands/brandSlice";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { toast } from "react-hot-toast";
import { addImages } from "@/features/images/imageSlice"
import { Camera, Coffee, StarOff } from "lucide-react"
import { Tooltip } from "@radix-ui/react-tooltip"
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function AddProductForm() {

  const [name, setName] = useState("")
  const [brandId, setBrandId] = useState("")
  const [productAttributes, setProductAttributes] = useState<Array<{ description: string; value: string }>>([])
  const [newAttribute, setNewAttribute] = useState("")
  const [newAttributeValue, setNewAttributeValue] = useState("")
  const [newCustomAttribute, setNewCustomAttribute] = useState("")
  const dispatch = useAppDispatch();
  const { brands } = useAppSelector((state) => state.brands);
  const { attributes } = useAppSelector((state) => state.attributes);
  const { error } = useAppSelector((state) => state.products);
  // const [images, setImages] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchAttributes());
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (error) {
      toast.error('Error al agregar el producto', {
        duration: 4000,
        removeDelay: 1000
      })
    } else {
      if (productAttributes.length === 0) {
        toast.error('El producto debe tener almenos un attributo', {
          duration: 4000,
          removeDelay: 1000
        })
        return
      }

      toast('¡El producto a sido agregado correctamente!', {
        icon: '☕',
        duration: 4000,
        removeDelay: 1000,
        style: {
          background: '#bc6c25',
          color: '#fefae0',
        }
      })

      let imageUrl = "https://via.placeholder.com/150";
      if (logoPreview) {
        const fileInput = document.getElementById("logo-upload") as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (file) {

          const response = await dispatch(addImages(file));

          const data = await response.payload.image_url;
          imageUrl = data
        }
      }

      dispatch(addProducts(
        {
          name,
          image_url: imageUrl,
          id_brand: Number.parseInt(brandId),
          attributes: productAttributes,
          status: true
        }
      ))
    }
    setName("")
    setBrandId("")
    setProductAttributes([])
    setNewAttribute("")
    setNewCustomAttribute("")
    setNewAttributeValue("")
  }

  const handleAddAttribute = () => {
    const attributeName = newAttribute === "new" ? newCustomAttribute : newAttribute
    if (attributeName && newAttributeValue) {

      const existe = productAttributes.find(attr => attr.description === newAttribute)

      if (existe) {
        toast.error('El atributo ya ha sido agregado', {
          id: 'error',
          duration: 4000,
          removeDelay: 1000
        })
        return
      }

      setProductAttributes([...productAttributes, { description: attributeName, value: newAttributeValue }])
      toast(`¡El atributo ${attributeName} a sido agregado correctamente!`, {
        icon: '☕',
        duration: 4000,
        removeDelay: 1000,
        style: {
          background: '#bc6c25',
          color: '#fefae0',
        }
      })


      if (!attributes.some(attr => attr.description === attributeName)) {
        toast(`¡El atributo ${attributeName} a sido creado!`, {
          icon: '☕',
          duration: 4000,
          removeDelay: 1000,
          style: {
            background: '#bc6c25',
            color: '#fefae0',
          }
        })
        dispatch(addAttribute({ description: newCustomAttribute }))
      }

      setNewAttribute("")
      setNewCustomAttribute("")
      setNewAttributeValue("")
      setLogoPreview(null)
      dispatch(fetchProducts())
    }
  }

  const DropAttribute = (description: string) => {
    console.log(description)
    setProductAttributes(productAttributes.filter(attr => attr.description !== description))
  }

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file)); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-4">
        <div className="h-full w-full flex-col items-center mt-5">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-4 border-amber-300 overflow-hidden flex items-center justify-center bg-white group-hover:border-amber-500 transition-all duration-300 shadow-lg">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                  ) : (
                    <Coffee className="w-16 h-16 text-amber-300 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="logo-upload"
                  onChange={handleLogoChange}
                />
                <label
                  htmlFor="logo-upload"
                  className="absolute bottom-2 right-2 bg-amber-600 text-white p-2 rounded-full cursor-pointer hover:bg-amber-700 hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <Camera className="w-5 h-5" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full space-y-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 ">
            Nombre del Producto
          </label>
          <Input className="w-96 rounded-[5px]" id="productName" value={name} onChange={(e) => setName(e.target.value)} required />

          <div>
            <label htmlFor="brandSelect" className="block text-sm font-medium text-gray-700">
              Marca
            </label>
            <Select value={brandId} onValueChange={setBrandId}>
              <SelectTrigger id="brandSelect" className="w-96 rounded-[5px]" >
                <SelectValue placeholder="Seleccionar marca" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


        </div>

      </div>
      <div className="p-6 overflow-auto max-w-max[100vh - 90px]">
        <h3 className="text-sm font-medium text-cafe-dark mb-2">Atributos</h3>
        {productAttributes.map((attr, index) => (
          <div key={index} className="flex gap-2 mb-4 items-center">
            <button onClick={() => DropAttribute(attr.description)}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <StarOff className="w-5 text-yellow-500" />

                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm font-medium text-cafe-dark">Borrar</p>
                </TooltipContent>
              </Tooltip>
            </button>
            <Input value={attr.description} readOnly className="bg-white border-cafe-medium" />
            <Input value={attr.value} readOnly className="bg-white border-cafe-medium" />
          </div>
        ))}
        <div className="flex gap-2 mb-2 ">
          <Select value={newAttribute} onValueChange={setNewAttribute}>
            <SelectTrigger className="bg-white border-cafe-medium">
              <SelectValue placeholder="Seleccionar atributo" />
            </SelectTrigger>
            <SelectContent>
              {attributes.map((attr) => (
                <SelectItem key={attr.id} value={attr.description}>
                  {attr.description}
                </SelectItem>
              ))}
              <SelectItem value="new">Agregar nuevo atributo</SelectItem>
            </SelectContent>
          </Select>

          {newAttribute === "new" ? (
            <Input
              placeholder="Nuevo atributo"
              value={newCustomAttribute}
              onChange={(e) => setNewCustomAttribute(e.target.value)}
              className="bg-white border-cafe-medium"
            />
          ) : null}
          <Input
            placeholder="Valor"
            value={newAttributeValue}
            onChange={(e) => setNewAttributeValue(e.target.value)}
            className="bg-white border-cafe-medium"
          />

          <div className="card flex justify-content-center">
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={handleAddAttribute}
                className="bg-amber-300 text-slate-800  rounded-[5px] hover:bg-cafe-medium hover:text-cafe-cream"
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center px-10 py-5 ">
        <Button
          className="w-full  bg-amber-600 hover:bg-amber-700 text-white "
          type="submit">Agregar Producto</Button>
      </div>
    </form>
  )
}

