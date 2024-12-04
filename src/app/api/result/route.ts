import prisma from '@/app/db';
export async function GET(req: Request) {
  try {
    // 요청 쿼리에서 resultNumber 추출
    const url = new URL(req.url);
    const resultNumberParam = url.searchParams.get('resultNumber');

    if (!resultNumberParam) {
      return new Response(JSON.stringify({ error: 'Missing "resultNumber" query parameter' }), { status: 400 });
    }

    const resultNumber = parseInt(resultNumberParam, 10);

    if (isNaN(resultNumber)) {
      return new Response(JSON.stringify({ error: 'Invalid "resultNumber" query parameter' }), { status: 400 });
    }

    // 1. avatarNumbers에서 resultNumber를 검색
    const avatarData = await prisma.avatarNumber.findFirst({
      where: {
        numbers: {
          has: resultNumber, // numbers 배열에서 resultNumber 포함 여부 확인
        },
      },
      include: {
        bodyType: true, // BodyType 데이터도 함께 가져옴
      },
    });

    if (!avatarData) {
      return new Response(JSON.stringify({ error: 'No avatar found for the provided resultNumber' }), { status: 404 });
    }

    // avatarInfo 생성
    const avatarInfo = {
      upperType: avatarData.bodyType.type, // BodyType의 type
      lowerType: avatarData.name, // AvatarNumber의 name
    };

    // 2. resultText에서 bodyType.type과 일치하는 데이터 검색
    const resultTexts = await prisma.resultText.findMany({
      where: {
        OR: [
          { type: avatarData.bodyType.type }, // upperType 조건
          { type: avatarData.name }, // lowerType 조건
        ],
      },
      include: {
        stylingTips: {
          include: {
            tips: true, // StylingTips에 연결된 Tips도 가져옴
          },
        },
      },
    });

    if (!resultTexts || resultTexts.length === 0) {
      return new Response(JSON.stringify({ error: 'No resultText found for the provided bodyType' }), { status: 404 });
    }

    // 응답 데이터 구성
    const responseData = {
      avatarInfo,
      resultText: resultTexts.map((result) => ({
        type: result.type,
        summary: result.summary,
        stylingTips: result.stylingTips
          ? {
              description: result.stylingTips.description,
              tips: result.stylingTips.tips.map((tip) => ({
                category: tip.category,
                description: tip.description,
              })),
            }
          : null,
      })),
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
