// import { NextResponse } from 'next/server';
// import prisma from '@/app/db';

// export async function PUT(req: Request) {
//   try {
//     // 요청 데이터 파싱
//     const { userEmail, resultAvatarNumber } = await req.json();

//     // 필수 값 확인
//     if (!userId || typeof resultAvatarNumber !== 'number') {
//       return NextResponse.json(
//         { error: 'Invalid data: userId or resultAvatarNumber is missing or incorrect' },
//         { status: 400 }
//       );
//     }

//     // 유저가 존재하는지 확인하고 resultAvatarNumber 업데이트
//     const updatedUser = await prisma.user.update({
//       where: { id: userId }, // 유저 ID로 찾기
//       data: { resultAvatarNumber }, // resultAvatarNumber 업데이트
//     });

//     // 성공적인 업데이트 반환
//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     console.error('Error updating user avatar number:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
