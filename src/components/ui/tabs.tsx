'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const Tabs = TabsPrimitive.Root

const tabsListVariants = cva(
  'inline-flex h-12 items-center justify-center rounded-base border-2 border-border dark:border-darkBorder p-1 text-text',
  {
    variants: {
      variant: {
        default: 'bg-main',
        green: 'bg-hardGreen',
        red: 'bg-hardRed',
        yellow: 'bg-hardYellow',
        purple: 'bg-hardPurple',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-base border-2 border-transparent px-3 py-1.5 text-sm font-heading ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-border dark:data-[state=active]:border-darkBorder',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-main',
        green: 'data-[state=active]:bg-hardGreen',
        red: 'data-[state=active]:bg-hardRed',
        yellow: 'data-[state=active]:bg-hardYellow',
        purple: 'data-[state=active]:bg-hardPurple',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
