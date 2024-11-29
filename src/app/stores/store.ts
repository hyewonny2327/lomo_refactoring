import { create } from 'zustand';

interface AvatarStore {
  step: number; // 현재 단계
  avatarIds: string[]; // 아바타 ID 목록
  finalAvatarId: number[]; // 최종 선택된 아바타 ID
  goNextStep: () => void; // 다음 단계로 이동
  goPrevStep: () => void; // 이전 단계로 이동
  setAvatarIds: (ids: string[]) => void; // 아바타 ID 설정
  setFinalAvatarId: (index: number, value: number) => void; // finalAvatarId의 특정 위치 값 변경
}

const useAvatarStore = create<AvatarStore>((set) => ({
  step: 0,
  avatarIds: ['10111', '20111', '30111', '40111', '50111'],
  finalAvatarId: [1, 0, 1, 1, 1],
  goNextStep: () => set((state) => ({ step: state.step + 1 })),
  goPrevStep: () =>
    set((state) => ({
      step: state.step > 0 ? state.step - 1 : 0, // step이 0보다 작아지지 않도록
    })),
  setAvatarIds: (ids: string[]) =>
    set(() => ({
      avatarIds: [...ids],
    })),
  setFinalAvatarId: (index, value) =>
    set((state) => {
      const { step, finalAvatarId, avatarIds } = state;
      // 1. finalAvatarId 배열 업데이트
      const updatedFinalAvatarId = [...finalAvatarId];
      updatedFinalAvatarId[index - 1] = value + (step !== 2 ? 1 : 0);
      // 2. avatarIds 배열 업데이트 (step < 5일 때만)
      if (step < 5) {
        let newAvatarIds = [...avatarIds];
        if (step === 1) {
          // Step이 1일 때: 첫 번째 인덱스 업데이트
          const prefix = updatedFinalAvatarId[0];
          const suffix = updatedFinalAvatarId.slice(2).join('');
          newAvatarIds = Array(5)
            .fill('')
            .map((_, idx) => `${prefix}${idx}${suffix}`);
        } else if (step >= 2) {
          // Step이 2 이상일 때: step에 해당하는 부분 업데이트
          newAvatarIds = avatarIds.map(
            (id, idx) => updatedFinalAvatarId.slice(0, step).join('') + (idx + 1) + id.slice(step + 1)
          );
        }
        return {
          finalAvatarId: updatedFinalAvatarId,
          avatarIds: newAvatarIds,
        };
      }

      // Step이 5 이상일 경우 avatarIds는 변경하지 않음
      return { finalAvatarId: updatedFinalAvatarId };
    }),
}));

export default useAvatarStore;
