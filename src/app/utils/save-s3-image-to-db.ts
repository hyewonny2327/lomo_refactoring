import prisma from '../db';
import { getS3FileUrls } from './s3-utils';
//s3에서 가져온 url 들을 prisma db에 저장하는 함수

export async function saveS3DataToDatabase() {
  try {
    const bucketName = 'lomo-avatar-images';
    const s3Data = await getS3FileUrls(bucketName);

    if (!s3Data || s3Data.length === 0) {
      throw new Error('No data received from S3');
    }

    await prisma.avatar.createMany({
      data: s3Data.map((item) => ({
        id: item.id,
        url: item.url,
      })),
      skipDuplicates: true,
    });

    console.log('S3 data saved to database successfully.');
  } catch (error) {
    console.error('Error saving data to database:', error);
    throw error; // 에러를 다시 던져 상위에서 처리
  }
}
