import { atom } from "jotai"
import type { Post } from "./types"

export const postsAtom = atom<Post[]>([])

export const postsTotalAtom = atom(0)

