import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NODE_ENV: z.string().min(1),
    DATABASE_URL: z.string().url(),
    ADMIN_EMAIL: z.string().email(),
    AWS_REGION: z.string().min(1),
    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_S3_BUCKET_NAME: z.string().min(1)
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME
  }
})
