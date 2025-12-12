import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui"
import { highlightText } from "../../../../shared/lib/highlightText"
import { CommentsList } from "../../../comments/ui/CommentsList"
import type { PostWithAuthor } from "../../model/postsViewAtoms"
import type { Comment } from "../../../../entities/comments/model/types"
import { usePostDetail } from "../model/usePostDetail"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: PostWithAuthor | null
  searchQuery: string
  onAddComment: () => void
  onEditComment: (comment: Comment) => void
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  post,
  searchQuery,
  onAddComment,
  onEditComment,
}: PostDetailDialogProps) => {
  const { comments, handleLike, handleDelete } = usePostDetail({ postId: post?.id ?? null })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{highlightText(post?.title ?? "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post?.body ?? "", searchQuery)}</p>
          <CommentsList
            postId={post?.id}
            comments={comments}
            searchQuery={searchQuery}
            onAddClick={onAddComment}
            onLike={handleLike}
            onEdit={onEditComment}
            onDelete={handleDelete}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
