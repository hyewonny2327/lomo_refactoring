import { S3Client, ListObjectsCommand, _Object } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
dotenv.config();

const s3 = new S3Client({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function getS3FileUrls(bucketName: string) {
  const command = new ListObjectsCommand({ Bucket: bucketName });

  try {
    const response = await s3.send(command);

    const fileData = response.Contents?.map((item: _Object) => {
      const fileUrl = `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/${item.Key}`;
      const id = item.Key?.split('/').pop()?.split('.').shift();
      return { id, url: fileUrl };
    });

    return fileData || [];
  } catch (err) {
    console.error('Error fetching file list:', err);
    return [];
  }
}
