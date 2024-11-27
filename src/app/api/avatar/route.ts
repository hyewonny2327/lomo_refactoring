import prisma from '@/app/db'; // Prisma 클라이언트 import

export async function GET(req: Request) {
  try {
    // 요청 쿼리에서 ids 추출
    const url = new URL(req.url);
    const idsParam = url.searchParams.get('ids');

    if (!idsParam) {
      return new Response(JSON.stringify({ error: 'Missing "ids" query parameter' }), { status: 400 });
    }

    // ids를 배열로 변환
    const ids = idsParam.split(',');
    console.log('Received IDs:', ids);

    // 데이터베이스에서 ID로 데이터 가져오기
    const avatars = await getAvatarImagesById(ids);

    if (!avatars || avatars.length === 0) {
      return new Response(JSON.stringify({ error: 'No avatars found for the provided IDs' }), { status: 404 });
    }

    // 성공적으로 데이터를 반환
    return new Response(JSON.stringify(avatars), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
export async function getAvatarImagesById(ids: string[]) {
  try {
    console.log('Querying for IDs:', ids);

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
