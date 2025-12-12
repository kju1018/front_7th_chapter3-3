export interface CommentUser {
  username: string
  image?: string
}

export interface Comment {
  id: number
  postId: number
  body: string
  likes?: number
  user?: CommentUser
}

export interface CommentsResponse {
  comments: Comment[]
}

export interface AddCommentPayload {
  body: string
  postId: number
  userId: number
}
