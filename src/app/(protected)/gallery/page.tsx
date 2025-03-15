import Link from 'next/link'

import { Button } from '@/components/ui/button'
import GalleryList from '@/features/gallery/components/gallery-list'

export default function GalleryPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <Button>
          <Link href="/gallery/create">Create</Link>
        </Button>
      </div>
      <GalleryList />
    </div>
  )
}
