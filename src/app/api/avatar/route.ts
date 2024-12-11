import { fetchAvatarImageFromDB } from '@/app/services/prisma/fetchAvatarImageFromDB';

//s3 버킷에서 가져온 아바타 이미지를 db에 저장하는 api
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing "id" query parameter' }), { status: 400 });
    }

    const avatar = await fetchAvatarImageFromDB(id);

    if (!avatar) {
      return new Response(JSON.stringify({ error: 'Avatar not found for the provided ID' }), { status: 404 });
    }

    return new Response(JSON.stringify(avatar), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
