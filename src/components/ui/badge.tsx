import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/components/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",

        // 🎨 COLORES DE CAFETERÍA
        espresso: "border-brown-900 bg-brown-900 text-white hover:bg-brown-800", // Café fuerte ☕
        latte: "border-amber-100 bg-amber-100 text-brown-900 hover:bg-amber-200", // Café con leche 🥛
        mocha: "border-brown-600 bg-brown-600 text-white hover:bg-brown-500", // Chocolate con café 🍫
        caramel: "border-yellow-600 bg-yellow-500 text-brown-900 hover:bg-yellow-400", // Caramelo 🍮
        macchiato: "border-orange-700 bg-orange-700 text-white hover:bg-orange-600", // Marrón rojizo 🎨
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
