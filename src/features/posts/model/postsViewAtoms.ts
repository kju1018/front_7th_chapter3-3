import { atom } from "jotai"
import type { Post } from "../../../entities/posts/model/types"
import { User } from "../../../entities/users/model/types"

export interface PostWithAuthor extends Post {
  author: User
}

export const postsWithAuthorAtom = atom<PostWithAuthor[]>([])

