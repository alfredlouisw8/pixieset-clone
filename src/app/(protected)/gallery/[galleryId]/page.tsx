import { PlusCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import GalleryDetail from '@/features/gallery/components/gallery-detail'

export default function GalleryDetailPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-2xl">Gallery</h1>
        <Button variant="ghost">
          <PlusCircleIcon className="mr-2 size-3" />
          Add Media
        </Button>
      </div>
      <GalleryDetail />
    </div>
  )
}
