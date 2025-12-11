export interface PostReactions {
  likes: number
  dislikes: number
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: PostReactions
}

export interface PostsResponse {
  posts: Post[]
  total: number
}

export interface AddPostPayload {
  title: string
  body: string
  userId: number
}
