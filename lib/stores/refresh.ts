import { create } from "zustand";

interface RefreshStore {
  triggerChannelRefresh: number;
  triggerRefresh: () => void;
}

export const useRefreshStore = create<RefreshStore>((set) => ({
  triggerChannelRefresh: 0,
  triggerRefresh: () =>
    set((state) => ({ triggerChannelRefresh: state.triggerChannelRefresh + 1 })),
}));
