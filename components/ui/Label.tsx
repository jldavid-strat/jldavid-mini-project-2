"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

interface CustomLabelProps{
  label: string;
  htmlFor: string;
  required: boolean;
  className?:string;
}

function CustomLabel({
  label,
  htmlFor,
  required,
  className,
}: CustomLabelProps){
  return(
    <div className={`inline-flex gap-1 ${className ?? ""}`}>
      <Label htmlFor={htmlFor}>{label}</Label>
      { required ? 
        <span className='text-red-700'>*</span>
        : ""
      }
    </div>
  )
}

export { Label, CustomLabel }
