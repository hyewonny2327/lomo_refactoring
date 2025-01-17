//session 타입 확장
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // id 추가
    } & DefaultSession['user'];
  }
}
export interface AvatarNumber {
  name: string;
  numbers: number[];
}

export interface BodyType {
  id: number; // Optional if not used in seeding
  type: string;
  avatarNumbers: AvatarNumber[];
}
export interface TextBlock {
  type: string;
  summary: string;
  stylingTips: stylingTip;
}
export interface stylingTip {
  description: string;
  tips: tip[];
}
export interface tip {
  category: string;
  description: string;
}

export interface ResultType {
  avatarInfo: { lowerType: string; upperType: string };
  resultText: TextBlock[];
}
