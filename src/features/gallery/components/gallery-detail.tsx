'use client'

export default function GalleryDetail() {
  const dataDummy = [
    {
      id: 1,
      name: 'Alfred & Natalie',
      items: 12,
      date: 'Mar 14, 2025',
      image: '/gallery/sample-photo-1.png',
    },
    {
      id: 2,
      name: 'Vincent & Natalie',
      items: 12,
      date: 'Mar 14, 2025',
      image: '/gallery/sample-photo-36.jpg',
    },
    {
      id: 3,
      name: 'Billy & Natalie',
      items: 12,
      date: 'Mar 14, 2025',
      image: '/gallery/sample-photo-37.jpg',
    },
  ]

  return (
    <div className="grid min-h-[calc(100vh-15rem)]">
      <div className="flex h-full items-center justify-center border-2 border-dotted hover:cursor-pointer">
        <div className="text-xs">Drag and drop or select a file</div>
      </div>
    </div>
  )
}
