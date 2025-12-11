import type { Post } from "../../posts/model/types"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostRow } from "./PostRow"

interface PostsTableProps {
  posts: Post[]
  searchQuery: string
  selectedTag: string
  onTagClick: (tag: string) => void
  onOpenUser: (user: any) => void
  onOpenPostDetail: (post: Post) => void
  onEditPost: (post: Post) => void
  onDeletePost: (id: number) => void
  renderHighlightedText: (text: string, highlight: string) => JSX.Element | null
}

export const PostsTable = ({
  posts,
  searchQuery,
  selectedTag,
  onTagClick,
  onOpenUser,
  onOpenPostDetail,
  onEditPost,
  onDeletePost,
  renderHighlightedText,
}: PostsTableProps) => (
  <>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">ID</TableHead>
        <TableHead>제목</TableHead>
        <TableHead className="w-[150px]">작성자</TableHead>
        <TableHead className="w-[150px]">반응</TableHead>
        <TableHead className="w-[150px]">작업</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {posts.map((post) => (
        <PostRow
          key={post.id}
          post={post}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          onTagClick={onTagClick}
          onOpenUser={onOpenUser}
          onOpenPostDetail={onOpenPostDetail}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
          renderHighlightedText={renderHighlightedText}
        />
      ))}
    </TableBody>
  </>
)
