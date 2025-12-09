import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_-3px_0_0_hsla(0,0,0,0.3)_inset] hover:bg-primary/90 active:shadow-none active:translate-y-[1px]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-[hsl(212,100%,32%)] bg-background text-[hsl(212,100%,32%)] shadow-[0_-3px_0_0_hsl(212,100%,32%)_inset] hover:bg-[hsl(212,100%,32%)]/5 active:shadow-none active:translate-y-[1px]",
        secondary:
          "border-2 border-[hsl(212,100%,32%)] bg-white text-[hsl(212,100%,32%)] shadow-[0_-1px_0_0_hsl(212,100%,32%)_inset] hover:bg-[hsl(212,100%,32%)]/5 active:shadow-none active:translate-y-[1px] dark:bg-transparent dark:border-[hsl(212,100%,60%)] dark:text-[hsl(212,100%,60%)] dark:shadow-[0_-1px_0_0_hsl(212,100%,60%)_inset]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-6 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-lg px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
