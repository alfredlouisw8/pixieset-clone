import GalleryForm from '@/components/gallery/GalleryForm'

export default function GalleryCreatePage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Create Gallery</h1>
      <GalleryForm />
    </div>
  )
}
