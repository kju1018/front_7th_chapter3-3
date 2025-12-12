import { atom } from "jotai"
import type { Comment } from "./types"

export const commentsAtom = atom<Record<number, Comment[]>>({})
