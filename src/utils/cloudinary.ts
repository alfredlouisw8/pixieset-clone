'use server'

import cloudinary from '@/lib/cloudinary'

export async function uploadToCloudinary(formData: FormData) {
  const files = formData.getAll('images') as File[] // Get multiple files
  if (!files.length) throw new Error('No files found')

  const uploadPromises = files.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, function (error, result) {
          if (error || !result) {
            reject(error || new Error('Upload failed'))
          } else {
            resolve(
              JSON.stringify({
                publicId: result.public_id,
                url: result.secure_url,
              })
            ) // Return the Cloudinary URL
          }
        })
        .end(buffer)
    })
  })

  return await Promise.all(uploadPromises) // Return array of uploaded URLs
}

export async function deleteFromCloudinary(publicIds: string[]) {
  return Promise.all(
    publicIds.map((publicId) =>
      cloudinary.uploader.destroy(publicId, {
        invalidate: true,
      })
    )
  )
}
