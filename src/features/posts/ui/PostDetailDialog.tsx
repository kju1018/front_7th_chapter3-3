import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import { CommentsList } from "../../comments/ui/CommentsList"
import type { PostWithAuthor } from "../model/postsViewAtoms"
import type { Comment } from "../../../entities/comments/api/commentsApi"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: PostWithAuthor | null
  searchQuery: string
  comments: Record<number, Comment[]>
  onAddComment: (postId: number) => void
  onLikeComment: (id: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (id: number, postId: number) => void
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  post,
  searchQuery,
  comments,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}: PostDetailDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{highlightText(post?.title, searchQuery)}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>{highlightText(post?.body, searchQuery)}</p>
        <CommentsList
          postId={post?.id}
          comments={comments}
          searchQuery={searchQuery}
          onAddClick={onAddComment}
          onLike={onLikeComment}
          onEdit={onEditComment}
          onDelete={onDeleteComment}
        />
      </div>
    </DialogContent>
  </Dialog>
)
