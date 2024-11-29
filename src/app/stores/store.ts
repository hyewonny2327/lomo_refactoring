import { create } from 'zustand';

interface AvatarStore {
  step: number; // 현재 단계
  avatarIds: string[]; // 아바타 ID 목록
  finalAvatarId: number[]; // 최종 선택된 아바타 ID
  history: string[][]; // 각 단계의 avatarIds 기록
  goNextStep: () => void; // 다음 단계로 이동
  goPrevStep: () => void; // 이전 단계로 이동
  setAvatarIds: (ids: string[]) => void; // 아바타 ID 설정
  updateAvatarState: (index: number, value: number) => void; // finalAvatarId의 특정 위치 값 변경
}

const useAvatarStore = create<AvatarStore>((set) => ({
  step: 0,
  avatarIds: ['10111', '20111', '30111', '40111', '50111'],
  finalAvatarId: [1, 0, 1, 1, 1],
  history: [[], ['10111', '20111', '30111', '40111', '50111']], // 초기 상태 기록 , 0번자리는 비워둔다
  goNextStep: () =>
    set((state) => {
      const { step, avatarIds, history } = state;
      if (step === 0) {
        return { step: step + 1 };
      }

      return {
        step: step + 1,
        history: [...history.slice(0, step + 1), avatarIds], // 현재 상태를 기록
      };
    }),

  goPrevStep: () =>
    set((state) => {
      const { step, history } = state;
      if (step <= 1) {
        return state;
      }
      const prevStep = step - 1;
      return {
        step: prevStep,
        avatarIds: history[prevStep], // 이전 단계의 avatarIds를 반환
      };
    }),
  //서버에서 받아올 아바타 이미지 리스트
  setAvatarIds: (ids: string[]) =>
    set((state) => ({
      avatarIds: [...ids],
      history: [...state.history.slice(0, state.step + 1), ids], // 상태 기록 갱신
    })),
  //사용자가 다음/이전 버튼을 클릭할 경우 실행
  updateAvatarState: (index, value) =>
    set((state) => {
      const { step, finalAvatarId, avatarIds } = state;

      // 1. finalAvatarId 업데이트 함수 -> 현재 슬라이더 값 반영
      const updateFinalAvatarId = (index: number, value: number) => {
        const updated = [...finalAvatarId];
        updated[index - 1] = value + (step !== 2 ? 1 : 0);
        return updated;
      };

      // 2. avatarIds 업데이트 함수 -> 다음 이미지 리스트 id 계산 후 반환
      const updateAvatarIds = (updatedFinalAvatarId: number[]) => {
        if (step === 1) {
          // Step 1: 첫 번째 인덱스 업데이트
          const prefix = updatedFinalAvatarId[0];
          const suffix = updatedFinalAvatarId.slice(2).join('');
          return Array(5)
            .fill('')
            .map((_, idx) => `${prefix}${idx > 1 ? 1 : idx}${suffix}`);
        } else if (step >= 2) {
          // Step >= 2: 현재 step에 해당하는 부분만 업데이트
          return avatarIds.map(
            (id, idx) => updatedFinalAvatarId.slice(0, step).join('') + (idx + 1) + id.slice(step + 1)
          );
        }
        return avatarIds; // 기본 반환
      };

      // 업데이트 로직 실행
      const updatedFinalAvatarId = updateFinalAvatarId(index, value);
      const newAvatarIds = step < 5 ? updateAvatarIds(updatedFinalAvatarId) : avatarIds;

      // 상태 업데이트, step 5 이상일경우 avatarids를 반환하지 않는다.
      return {
        finalAvatarId: updatedFinalAvatarId,
        ...(step < 5 && { avatarIds: newAvatarIds }),
      };
    }),
}));

export default useAvatarStore;
