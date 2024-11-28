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
  setFinalAvatarId: (index: number, value: number) =>
    set((state) => {
      // 1. finalAvatarId 배열 업데이트
      const updatedFinalAvatarId = [...state.finalAvatarId];
      if (state.step === 2) {
        updatedFinalAvatarId[index - 1] = value;
      } else {
        updatedFinalAvatarId[index - 1] = value + 1;
      }
      let newAvatarIds = [...state.avatarIds];
      //마지막 단계에서는 avatarIds를 업데이트하지 않음
      if (state.step < 5) {
        // 2. avatarIds 배열 업데이트
        if (state.step === 1) {
          // Step이 1일 때: 1번 인덱스 변경
          const prefix = updatedFinalAvatarId[0];
          const suffix = updatedFinalAvatarId.slice(2).join('');
          newAvatarIds = [
            `${prefix}0${suffix}`,
            `${prefix}1${suffix}`,
            `${prefix}0${suffix}`,
            `${prefix}0${suffix}`,
            `${prefix}0${suffix}`,
          ];
        } else if (state.step >= 2) {
          // Step이 2 이상일 때: 현재 step 인덱스를 업데이트
          newAvatarIds = state.avatarIds.map((id, idx) => {
            // 현재 step에 해당하는 인덱스만 변경

            const updatedId = updatedFinalAvatarId.slice(0, state.step).join('') + (idx + 1) + id.slice(state.step + 1);

            return updatedId;
          });
        }
        return {
          finalAvatarId: updatedFinalAvatarId,
          avatarIds: newAvatarIds,
        };
      } else {
        return { finalAvatarId: updatedFinalAvatarId };
      }
    }),
}));

export default useAvatarStore;
