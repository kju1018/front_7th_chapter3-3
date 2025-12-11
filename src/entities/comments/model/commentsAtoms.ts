import { atom } from "jotai"
import type { Comment } from "../api/commentsApi"

export const commentsAtom = atom<Record<number, Comment[]>>({})

