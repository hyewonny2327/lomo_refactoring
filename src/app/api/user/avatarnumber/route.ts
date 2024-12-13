import { NextResponse } from 'next/server';
import prisma from '@/app/db';

//유저의 아바타 번호를 저장하는 api
export async function PUT(req: Request) {
  try {
    // 요청 데이터 파싱
    const { userEmail, avatarNumber } = await req.json();

    // 필수 값 확인
    if (!userEmail || typeof avatarNumber !== 'number') {
      return NextResponse.json(
        { error: 'Invalid data: userId or resultAvatarNumber is missing or incorrect' },
        { status: 400 }
      );
    }

    // 유저가 존재하는지 확인하고 resultAvatarNumber 업데이트
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: { avatarNumber: avatarNumber },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user avatar number:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

//유저 id 를 기준으로 아바타 넘버를 가져오는 api

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userID 가 제대로 전달되지 않아 avatar number 를 불러올 수 없습니다.' },
        { status: 400 }
      );
    }

    //id 를 기준으로 avatar number 를 찾아서 반환
    const userAvatarNumber = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (userAvatarNumber?.avatarNumber) {
      return NextResponse.json(userAvatarNumber?.avatarNumber, { status: 200 });
    } else {
      return NextResponse.json({ message: '유저 아바타가 존재하지 않습니다.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error get user avatar number:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
