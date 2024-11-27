export async function fetchAvatars(ids: string[]) {
  try {
    // ids를 쿼리 파라미터로 전달
    const query = ids.join(',');
    const response = await fetch(`/api/avatar?ids=${query}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch avatars');
    }

    const avatars = await response.json();
    return avatars;
  } catch (error) {
    console.error('Error fetching avatars:', error);
    throw error;
  }
}
