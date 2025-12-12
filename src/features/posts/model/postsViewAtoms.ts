import type { Post } from "../../../entities/posts/model/types"
import type { User } from "../../../entities/users/model/types"

export interface PostWithAuthor extends Post {
  author?: User
}
