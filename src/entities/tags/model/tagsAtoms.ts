import { atom } from "jotai"
import type { Tag } from "./types"

export const tagsAtom = atom<Tag[]>([])

