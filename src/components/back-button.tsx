'use client'

import { ArrowLeft } from 'lucide-react'

import { Button } from './ui/button'

export default function BackButton() {
  return (
    <Button onClick={() => history.back()} variant="ghost" className="w-fit">
      <ArrowLeft className="size-4" />
    </Button>
  )
}
