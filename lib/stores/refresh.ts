import { create } from "zustand";

interface RefreshStore {
  refreshCount: number;
  triggerRefresh: () => void;
}

export const useRefreshStore = create<RefreshStore>((set) => ({
  refreshCount: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshCount: state.refreshCount + 1 })),
}));
