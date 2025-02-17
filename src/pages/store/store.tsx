"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {  Mail, Phone, MapPin, Edit, Coffee, StoreIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { fetchStoresID, editStore } from "@/features/companies/storeSlice"
import { Store } from "@/types/companies/store"
import { addImages } from "@/features/images/imageSlice"

export default function CafePreview() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [references, setReferences] = useState("")
  const { stores } = useAppSelector((state) => state.stores)
  const employee = useAppSelector((state) => state.auth.employee);
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    logo: "",
  })

  useEffect(() => {
    if (employee) {

      dispatch(fetchStoresID(String(employee.id_store)))
      
      .then((response) => {
        const store = response.payload;

        setFormData({
          name: store.name,
          email: store.email,
          phone: store.phone,
          address: store.address,
          logo: store.logo ?? "Sin logo",
        });
      });

  }


    console.log(stores)
  }, [dispatch, employee]);  // 👈 Agregar employee como dependencia por seguridad
  
console.log(stores)
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let imageUrl = ""
    const fileInput = document.getElementById("logo") as HTMLInputElement
    const file = fileInput.files?.[0]

    if(file){
      const response = await dispatch(addImages(file))
      imageUrl = response.payload.image_url
    }
    
    if(employee){
      dispatch(editStore({ id: String(employee.id_store), 
        store:{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        logo: imageUrl
       }}))
    }
    setIsModalOpen(false)
    
  }



  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Card className="max-w-3xl mx-auto bg-white shadow-lg">
        <CardHeader className="space-y-1 border-b pb-7 pt-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StoreIcon className="h-6 w-6 text-amber-600" />
              <CardTitle className="text-2xl font-bold">Cafeteria Management</CardTitle>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-amber-600 hover:bg-amber-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Store
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          
          {
            stores.map((store) => (
              <p><strong>Nombre:</strong> {store.name}</p>
             ))
          }

              <div className="space-y-8">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 rounded-lg border-2 border-amber-200">
                <AvatarImage src={formData.logo ?? "default-logo.png"} alt={formData.name} />
                <AvatarFallback className="bg-amber-50 text-amber-600">
                  <Coffee className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-gray-800">{formData.name}</h2>
                <p className="text-amber-600 italic">Your Cozy Coffee Corner</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-gray-800">{formData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-gray-800">{formData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-800">{formData.address}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <StoreIcon className="h-5 w-5 text-amber-600" />
              Edit Store
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-sm font-medium">
                Store Name
              </Label>
              <Input
                id="name"
                placeholder="Enter store name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="address" className="text-sm font-medium">
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter store address"
                className="resize-none"
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="logo" className="text-sm font-medium">
                Store Logo
              </Label>
              <Input id="logo" type="file" accept="image/*" 
              onChange={(e) => {
                const file = e.target.files?.[0]
                if(file){
                  setReferences(file.name)
                }

              }}/>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

