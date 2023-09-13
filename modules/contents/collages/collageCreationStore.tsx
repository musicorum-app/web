import { create } from "zustand"

export enum ThemeEnum {
  ClassicCollage = "classic_collage",
}

interface CollageCreationStore {
  theme: ThemeEnum | null
  setTheme(theme: ThemeEnum): void
}

export const useCollageCreationStore = create<CollageCreationStore>(set => ({
  theme: null,
  setTheme: theme => set({ theme }),
}))
