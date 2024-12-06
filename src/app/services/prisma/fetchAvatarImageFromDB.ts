//단일 아바타 이미지 조회
import prisma from '@/app/db';
export async function fetchAvatarImageFromDB(id: string) {
  console.log('Querying for ID:', id);

  try {
    const avatar = await prisma.avatar.findUnique({
      where: { id },
      select: {
        id: true,
        url: true,
      },
    });

    console.log('Fetched avatar:', avatar);
    return avatar;
  } catch (error) {
    console.error('Error fetching avatar image by ID:', error);
    throw new Error('Failed to fetch avatar image.');
  } finally {
    await prisma.$disconnect();
  }
}
