import React, { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

export interface RequiredLabelProps extends ComponentPropsWithoutRef<'span'> {}

export default function RequiredLabel({
  className,
  ...props
}: RequiredLabelProps) {
  return (
    <span className={cn('text-red-500', className)} {...props}>
      *
    </span>
  )
}
