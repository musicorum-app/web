import { create } from "zustand"

export enum ThemeEnum {
  ClassicCollage = "classic_collage",
}

export enum CreationStatus {
  Idle = "Idle",
  Loading = "Loading",
  Downloading = "Downloading",
  Done = "Done",
}

export interface Collage {
  duration: number
  file: string
  id: string
  url: string
}

interface CollageCreationStore {
  theme: ThemeEnum
  setTheme(theme: ThemeEnum): void,
  
  status: CreationStatus,
  setStatus(status: CreationStatus): void
  
  result: Collage | null
  setResult(result: Collage | null): void
}

export const useCollageCreationStore = create<CollageCreationStore>(set => ({
  theme: ThemeEnum.ClassicCollage,
  setTheme: theme => set({ theme }),
  
  status: CreationStatus.Idle,
  setStatus: status => set({ status }), 

  result: null,
  setResult: result => set({ result })
}))
