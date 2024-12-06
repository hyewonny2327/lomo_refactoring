import { ResultType } from '@/app/types/types';

export async function fetchResults(resultNumber: number): Promise<ResultType> {
  try {
    //result number 전달
    const response = await fetch(`/api/result?resultNumber=${resultNumber}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch results');
    }

    const results = await response.json();
    return results;
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
}
