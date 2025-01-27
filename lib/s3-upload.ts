'use server'

import {
  MAX_FILE_SIZE,
  SUPPORTED_AUDIO_TYPES,
  SUPPORTED_IMAGE_TYPES,
  SUPPORTED_VIDEO_TYPES,
} from '@/constants'
import { env } from '@/env'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'
import sharp from 'sharp'

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function uploadToS3(file: File, postId: string) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024} MB`)
  }

  const fileExtension = file.name.split('.').pop()
  const uniqueSuffix = crypto.randomBytes(8).toString('hex')
  const filename = `${postId}/${uniqueSuffix}.${fileExtension}`

  let processedBuffer: Buffer

  if (SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    processedBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .resize({
        width: 1920,
        height: 1080,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toBuffer()
  } else if (
    SUPPORTED_VIDEO_TYPES.includes(file.type) ||
    SUPPORTED_AUDIO_TYPES.includes(file.type)
  ) {
    processedBuffer = Buffer.from(await file.arrayBuffer())
  } else {
    throw new Error('Unsupported file type')
  }

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: filename,
    Body: processedBuffer,
    ContentType: file.type,
  }

  try {
    const command = new PutObjectCommand(uploadParams)
    await s3Client.send(command)

    const fileUrl = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/${filename}`

    return {
      url: fileUrl,
      type: file.type,
    }
  } catch (error) {
    console.error('S3 Upload Error:', error)
    throw error
  }
}

export async function deleteFromS3(fileUrl: string) {
  try {
    // Extract the key from the fileUrl
    const urlParts = fileUrl.split('/')
    const key = urlParts.slice(4).join('/') // Skip protocol, empty, domain, bucket name
    const decodedKey = decodeURI(key)

    if (!decodedKey) {
      throw new Error('Invalid file URL')
    }

    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: decodedKey,
    }

    const command = new DeleteObjectCommand(deleteParams)
    await s3Client.send(command)

    return {
      success: true,
      message: 'File deleted successfully',
    }
  } catch (error) {
    console.error('S3 Delete Error:', error)
    return {
      success: false,
      message: 'Failed to delete file',
    }
  }
}
