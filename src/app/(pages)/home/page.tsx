'use client';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Button from '@/app/components/Button';
import useAvatarStore from '@/app/stores/store';
import { getAvatarNumber } from '@/app/services/client/getAvatarNumber';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setFinalAvatarId, finalAvatarId } = useAvatarStore();
  function handleClickStartButton() {
    router.push('/select/0');
  }
  function handleClickLoginButton() {
    router.push('/login');
  }
  function handleClickLogoutButton() {
    signOut();
  }

  async function handleClickMyResultButton() {
    //id 를 기준으로 유저의 avatar number조회
    // 존재하면 -> store 의 상태 변경 후 페이지 이동
    // 존재하지 않으면 -> alert 띄우고, select페이지로 이동

    try {
      if (status === 'authenticated') {
        const response = await getAvatarNumber(session?.user.id);

        if (response.status === 404) {
          alert('저장된 아바타 정보가 없습니다.');
          router.push('/select/0');
        }

        const avatarNumber = response; // 정상적으로 데이터 파싱
        setFinalAvatarId(avatarNumber);
        console.log('Avatar Number:', avatarNumber);
        router.push('/select/result');
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    console.log(session?.user.id);
  }, [session]);

  useEffect(() => {
    console.log('id 출력합니다', finalAvatarId);
  }, [finalAvatarId]);

  return (
    <div className={styles.contentContainer}>
      <Image className={styles.logo} src="/logo.svg" alt="LOMO logo" width={263} height={77} priority />
      <div className={styles.textBox}>
        <div>&quot;내 몸을 알고 나를 알다&quot;</div>
        <div>체형분석을 통해 당신만의 특별함을 찾아보세요</div>
      </div>
      <div className={styles.buttonBox}>
        {status === 'authenticated' ? (
          <>
            <Button type="outlined" size="large" color="primary" onClick={handleClickLogoutButton}>
              로그아웃
            </Button>
            <Button type="colored" size="large" color="primary" onClick={handleClickMyResultButton}>
              내 결과 보기
            </Button>
          </>
        ) : (
          <Button type="outlined" size="large" color="primary" onClick={handleClickLoginButton}>
            로그인
          </Button>
        )}

        <Button type="colored" size="large" color="primary" onClick={handleClickStartButton}>
          시작하기
        </Button>
      </div>
    </div>
  );
}
