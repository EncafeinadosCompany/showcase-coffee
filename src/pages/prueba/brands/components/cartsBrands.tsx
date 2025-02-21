import { brandType } from "@/types/products/brand";
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger} from "@/components/ui/tooltip";
  import {Card,CardFooter,CardHeader} from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";


export default function CartsBrands({ brands }:{brands: brandType}) {
  return (
    <DialogTrigger asChild>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden px-2">
      <div className="relative w-full h-28 mt-2">
        <img
          src={brands.image_url || "/public/undraw_coffee_7r49.svg"}
          alt={brands.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader className="flex flex-col items-center overflow-hidden ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="font-semibold text-lg mb-0 h-10overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                {brands.name}
              </p>
              <TooltipContent className="bg-[#99582a] text-white p-2 rounded-md text-sm">
                {brands.name}
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full rounded-2xl">
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
     </DialogTrigger>
  
  );
}
