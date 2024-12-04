'use client';
import useAvatarStore from '@/app/stores/store';
import React from 'react';

const ResultPage = () => {
  const { finalAvatarId } = useAvatarStore();
  return <div>{finalAvatarId}</div>;
};

export default ResultPage;
