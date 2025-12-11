import { atom } from "jotai"
import type { Post } from "../../../entities/posts/model/types"

export interface PostWithAuthor extends Post {
  author?: any
}

export const postsWithAuthorAtom = atom<PostWithAuthor[]>([])

