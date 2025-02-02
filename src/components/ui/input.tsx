import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'flex h-10 w-full rounded-base border-2 text-text dark:text-darkText font-base selection:bg-main selection:text-text border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        // shadowNoBorder:
        //   'flex h-10 w-full rounded-base border-2 text-text dark:text-darkText font-base selection:bg-main selection:text-text border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-base border-border shadow-light dark:shadow-dark',
        shadowNoBorder:
        'flex h-10 w-full rounded-base border-2 text-text dark:text-darkText font-base selection:bg-transparent selection:text-inherit border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-base shadow-light dark:shadow-dark focus:shadow-none focus:border-black focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
            
      },
    },
    defaultVariants: {
      variant: 'default'
    },
  },
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
    asChild?: boolean
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        // className={cn(
        //   'flex h-10 w-full rounded-base border-2 text-text dark:text-darkText font-base selection:bg-main selection:text-text border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        //   className,
        // )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
