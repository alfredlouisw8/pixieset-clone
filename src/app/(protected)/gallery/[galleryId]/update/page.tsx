import BackButton from '@/components/back-button'
import getGalleryById from '@/features/gallery/actions/getGalleryById'
import GalleryUpdateForm from '@/features/gallery/components/gallery-update-form'

export default async function GalleryUpdatePage({
  params,
}: {
  params: Promise<{ galleryId: string }>
}) {
  const { galleryId } = await params
  const gallery = await getGalleryById(galleryId)

  return (
    <div className="flex max-w-lg flex-col gap-5">
      <BackButton />
      <h1 className="text-3xl font-bold">Update Gallery</h1>

      {gallery ? (
        <GalleryUpdateForm galleryData={gallery} />
      ) : (
        <div>Gallery not found</div>
      )}
    </div>
  )
}
