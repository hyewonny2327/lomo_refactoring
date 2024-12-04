import { getS3FileUrls } from '../utils/s3-utils';
import { saveS3DataToDatabase } from '../utils/save-s3-image-to-db';

//s3버킷에서 이미지 url 가져옴
//db에 객체 저장
getS3FileUrls('lomo-avatar-images')
  .then(() => saveS3DataToDatabase())
  .catch((err: unknown) => console.error('Error initializing S3 data:', err))
  .finally(() => process.exit());
