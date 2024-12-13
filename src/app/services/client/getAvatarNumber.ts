export async function getAvatarNumber(userId: string) {
  try {
    const res = await fetch(`/api/user/avatarnumber?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('아바타 넘버를 가져오지 못했습니다.', error);
  }
}
