import { persist } from 'zustand/middleware';
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
  resetStore: () => void;
  setFinalAvatarId: (id: string) => void;
}

const useAvatarStore = create<AvatarStore>()(
  persist(
    (set) => ({
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

      setAvatarIds: (ids: string[]) =>
        set((state) => ({
          avatarIds: [...ids],
          history: [...state.history.slice(0, state.step + 1), ids], // 상태 기록 갱신
        })),

      updateAvatarState: (index, value) =>
        set((state) => {
          const { step, finalAvatarId, avatarIds } = state;

          const updateFinalAvatarId = (index: number, value: number) => {
            const updated = [...finalAvatarId];
            updated[index - 1] = value + (step !== 2 ? 1 : 0);
            return updated;
          };

          const updateAvatarIds = (updatedFinalAvatarId: number[]) => {
            if (step === 1) {
              const prefix = updatedFinalAvatarId[0];
              const suffix = updatedFinalAvatarId.slice(2).join('');
              return Array(5)
                .fill('')
                .map((_, idx) => `${prefix}${idx > 1 ? 1 : idx}${suffix}`);
            } else if (step >= 2) {
              return avatarIds.map(
                (id, idx) => updatedFinalAvatarId.slice(0, step).join('') + (idx + 1) + id.slice(step + 1)
              );
            }
            return avatarIds;
          };

          const updatedFinalAvatarId = updateFinalAvatarId(index, value);
          const newAvatarIds = step < 5 ? updateAvatarIds(updatedFinalAvatarId) : avatarIds;

          return {
            finalAvatarId: updatedFinalAvatarId,
            ...(step < 5 && { avatarIds: newAvatarIds }),
          };
        }),
      resetStore: () => {
        // Zustand 상태 초기화
        set(() => ({
          step: 0,
          avatarIds: ['10111', '20111', '30111', '40111', '50111'],
          history: [[]],
        }));
        // 로컬 스토리지 초기화
        useAvatarStore.persist.clearStorage();
      },
      setFinalAvatarId: (id: string) => {
        const idStr = String(id);
        const newAvatarId = idStr.split('').map(Number);
        return set(() => ({
          finalAvatarId: newAvatarId,
        }));
      },
    }),
    {
      name: 'avatar-store',
      partialize: (state) => {
        const currentStep = state.step;
        // 특정 단계에서만 저장하도록 조건 추가 (예: 결과 페이지에서만 저장)
        return currentStep === 5 ? { finalAvatarId: state.finalAvatarId } : {};
      },
    }
  )
);

export default useAvatarStore;
