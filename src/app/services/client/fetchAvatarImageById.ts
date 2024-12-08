export async function fetchAvatarImageById(id: string): Promise<{ id: string; url: string }> {
  try {
    // ids를 쿼리 파라미터로 전달

    const response = await fetch(`/api/avatar?id=${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '아바타 이미지를 가져오지 못했습니다.');
    }

    const avatar = await response.json();
    return avatar;
  } catch (error) {
    console.error('아바타 이미지를 가져오지 못했습니다.:', error);
    throw error;
  }
}
