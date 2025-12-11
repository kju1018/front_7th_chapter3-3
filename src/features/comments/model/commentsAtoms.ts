import { atom } from "jotai"
import type { Comment } from "../../../entities/comments/api/commentsApi"

export const commentsAtom = atom<Record<number, Comment[]>>({})

