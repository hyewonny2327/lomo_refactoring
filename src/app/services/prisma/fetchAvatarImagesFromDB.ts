import prisma from '@/app/db'; // Prisma 클라이언트 import

export async function fetchAvatarImagesFromDB(ids: string[]) {
  console.log('Querying for IDs:', ids);

  try {
    // Prisma 쿼리: ID 배열에 해당하는 데이터를 조회
    const avatars = await prisma.avatar.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        url: true,
      },
    });

    console.log('Fetched avatars:', avatars);
    return avatars; // 배열 형태로 반환
  } catch (error) {
    console.error('Error fetching avatar images by ID:', error);
    throw new Error('Failed to fetch avatar images.');
  } finally {
    await prisma.$disconnect(); // Prisma 클라이언트 연결 종료
  }
}
