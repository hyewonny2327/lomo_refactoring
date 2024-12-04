'use client';
import useAvatarStore from '@/app/stores/store';
import { fetchResults } from '@/app/utils/api/fetchResults';
import React, { useEffect } from 'react';

const ResultPage = () => {
  const { finalAvatarId } = useAvatarStore();

  useEffect(() => {
    const resultNumber = Number(finalAvatarId.join(''));
    fetchResults(resultNumber).then((result) => console.log(result));
  }, [finalAvatarId]);
  return <div>{finalAvatarId}</div>;
};

export default ResultPage;
