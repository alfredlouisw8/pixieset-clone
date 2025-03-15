'use client'

import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
export default function GalleryList() {
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
    <div className="grid grid-cols-12 gap-4">
      {dataDummy.map((item) => (
        <div
          key={item.id}
          className="col-span-6 flex h-full flex-col gap-2 lg:col-span-4 xl:col-span-3 2xl:col-span-2"
        >
          <div className="group relative h-48 w-full cursor-pointer">
            <Image
              src={item.image}
              alt="Next.js logo"
              width={300}
              height={150}
              className="size-full object-cover"
              priority
            />
            {/*image*/}
            <div className="absolute right-1 top-1 rounded p-2 opacity-0 transition group-hover:opacity-100">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-7">
                    <EllipsisVerticalIcon className="size-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-52 p-0" align={'start'}>
                  <div className="grid">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full justify-start"
                    >
                      <PencilIcon className="ml-6 mr-4 size-4 " />
                      Quick Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full justify-start"
                    >
                      <TrashIcon className="ml-6 mr-4 size-4" />
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/*text*/}
          <div className="mt-auto flex flex-col">
            <span className="text-m font-bold">{item.name}</span>
            <span className="text-xs text-gray-500">
              {item.items} items • {item.date}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
