import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Instagram, Facebook, Twitter, Globe, Phone, User } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { BrandFormValues } from "@/types/products/brand";
import type { SocialNetwork } from "@/types/products/socialNetwork";

interface BrandSocialNetworksFormProps {
  fields: Record<"id", string>[];
  append: (value: { social_network_id: number; url: string; description: string }) => void;
  remove: (index: number) => void;
  form: UseFormReturn<BrandFormValues>;
  socialNetworks: SocialNetwork[];
}

export default function BrandSocialNetworksForm({ 
  fields, 
  append, 
  remove, 
  form,
  socialNetworks 
}: BrandSocialNetworksFormProps) {
  
  // Get the appropriate icon and placeholder based on the social network
  const getSocialNetworkInfo = (networkId: number) => {
    const network = socialNetworks.find(n => n.id === networkId);
    const networkName = network?.name?.toLowerCase() || "";
    
    let icon = <Globe className="h-5 w-5" />;
    let placeholder = "https://...";
    let fieldType = "url";
    
    if (networkName.includes("instagram")) {
      icon = <Instagram className="h-5 w-5 text-pink-600" />;
      placeholder = "@usuario";
      fieldType = "text";
    } else if (networkName.includes("facebook")) {
      icon = <Facebook className="h-5 w-5 text-blue-600" />;
      placeholder = "https://facebook.com/...";
      fieldType = "url";
    } else if (networkName.includes("twitter") || networkName.includes("x")) {
      icon = <Twitter className="h-5 w-5 text-sky-500" />;
      placeholder = "@usuario";
      fieldType = "text";
    } else if (networkName.includes("whatsapp")) {
      icon = <Phone className="h-5 w-5 text-green-500" />;
      placeholder = "+57 3001234567";
      fieldType = "tel";
    } else if (networkName.includes("tiktok")) {
      icon = <User className="h-5 w-5 text-black" />;
      placeholder = "@usuario";
      fieldType = "text";
    }
    
    return { icon, placeholder, fieldType };
  };

  return (
    <Card className="p-6 bg-white">
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#6F4E37]">
            Redes Sociales
          </h2>
          <Button
            type="button"
            data-cy="add-network"
            onClick={() =>
              append({ social_network_id: 0, url: "", description: "" })
            }
            className="bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium"
          >
            <Plus className="mr-[1px] h-4 w-4" />
            Agregar Red Social
          </Button>
        </div>

        {fields.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No has agregado ninguna red social aún. Haz clic en "Agregar Red Social" para comenzar.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map((field, index) => {
            const networkId = form.watch(`social_networks.${index}.social_network_id`);
            const { icon, placeholder, fieldType } = getSocialNetworkInfo(networkId);
            
            return (
              <Card key={field.id} className="overflow-hidden border-l-4 border-l-amber-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <FormLabel className="text-[#6F4E37]  font-medium">
                      Red Social
                    </FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="h-8 w-8 p-0 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name={`social_networks.${index}.social_network_id`}
                    render={({ field }) => (
                      <FormItem className="mb-3" >
                        <Select
                        
                          onValueChange={(value) =>
                            field.onChange(Number.parseInt(value))
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl >
                            <SelectTrigger   data-cy="select-network"  className="w-full text-[#6F4E37] border-[#6F4E37] rounded-xl">
                              <SelectValue placeholder="Selecciona una red social" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent data-cy="social-network-list">
                            {socialNetworks.map((network) => (
                              <SelectItem
                              data-cy={`option-${network.name.toLowerCase()}`} 
                                key={network.id}
                                value={network.id.toString()}
                                className="text-[#6F4E37]"
                              >
                                {network.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {networkId > 0 && (
                    <>
                      <FormField
                        control={form.control}
                        name={`social_networks.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="mb-3">
                            <FormLabel className="text-[#6F4E37]">
                              {fieldType === "tel" ? "Número de teléfono" : 
                                fieldType === "text" ? "Usuario" : "URL"}
                            </FormLabel>
                            <FormControl data-cy="social-network-type">
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  {icon}
                                </div>
                                <Input
                                  type={fieldType}
                                  placeholder={placeholder}
                                  {...field}
                                  className="pl-10 border-[#6F4E37] rounded-xl"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`social_networks.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#6F4E37]">
                              Descripción
                            </FormLabel>
                            <FormControl data-cy="social-network-description" >
                              <Input
                                placeholder="Ej: Síguenos en Instagram"
                                {...field}
                                className="border-[#6F4E37] rounded-xl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}