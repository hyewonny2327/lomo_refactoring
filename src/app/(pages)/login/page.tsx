'use client';
import React, { useState } from 'react';
import styles from '../../styles/login.module.scss';
import Input from '@/app/components/Input';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { FaGoogle } from 'react-icons/fa';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleLoginClick() {
    console.log('로그인합니다');
    routeToSelectPage();
  }

  function handleClickSocialLogin(type: string) {
    console.log('로그인합니다', type);
    signIn(type);
  }
  function routeToSelectPage() {
    router.push('/select/0');
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.textBox}>
        로그인하면
        <br />
        체형정보를 저장할 수 있어요.
      </div>
      <div className={styles.inputBox}>
        <Input value={email} placeholder="이메일을 입력하세요" onChange={handleChangeEmail} type="email" />
        <Input value={password} placeholder="비밀번호를 입력하세요" onChange={handleChangePassword} type="password" />
      </div>
      <div className={styles.socialLogin__box}>
        <div className={styles.socialLogin__text}>소셜로그인 하기</div>
        <div className={styles.socialLogin__buttonBox}>
          <div
            className={`${styles.socialLogin__button} ${styles.socialLogin__button__kakao}`}
            onClick={() => handleClickSocialLogin('kakao')}
          >
            <RiKakaoTalkFill size={16} color="white" />
          </div>
          <div className={`${styles.socialLogin__button} ${styles.socialLogin__button__naver}`}>
            <SiNaver size={12} color="white" />
          </div>
          <div className={`${styles.socialLogin__button} ${styles.socialLogin__button__google}`}>
            <FaGoogle size={12} color="white" />
          </div>
        </div>
      </div>
      <footer className={styles.startButtonBox}>
        <Button type="colored" color="primary" size="large" onClick={handleLoginClick}>
          로그인하기
        </Button>
        <Button type="outlined" color="primary" size="large" onClick={routeToSelectPage}>
          건너뛰기
        </Button>
      </footer>
    </div>
  );
};

export default LoginPage;
