import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import crypto from "crypto"

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export async function uploadToS3(file: File, postId: string) {
  const fileExtension = file.name.split(".").pop()
  const uniqueSuffix = crypto.randomBytes(8).toString("hex")
  const filename = `${postId}/${uniqueSuffix}.${fileExtension}`

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: filename,
    Body: new Uint8Array(await file.arrayBuffer()),
    ContentType: file.type
  }

  try {
    const command = new PutObjectCommand(uploadParams)
    await s3Client.send(command)

    // Construct public URL (adjust based on your S3 bucket configuration)
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`

    return imageUrl
  } catch (error) {
    console.error("S3 Upload Error:", error)
    throw error
  }
}
