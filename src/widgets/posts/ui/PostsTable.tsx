import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostItem } from "../../../features/posts/ui/PostItem"
import { PostWithAuthor } from "../../../features/posts/model/postsViewAtoms"
import { User } from "../../../entities/users/model/types"

interface PostsTableProps {
  posts: PostWithAuthor[]
  searchQuery: string
  selectedTag: string
  onTagClick: (tag: string) => void
  onOpenUser: (user: User) => void
  onOpenPostDetail: (post: PostWithAuthor) => void
  onEditPost: (post: PostWithAuthor) => void
  onDeletePost: (id: number) => void
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
}: PostsTableProps) => (
  <Table>
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
        <PostItem
          key={post.id}
          post={post}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          onTagClick={onTagClick}
          onOpenUser={onOpenUser}
          onOpenPostDetail={onOpenPostDetail}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
        />
      ))}
    </TableBody>
  </Table>
)
