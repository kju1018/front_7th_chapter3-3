import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import type { PostWithAuthor } from "../model/postsViewAtoms"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: PostWithAuthor | null
  searchQuery: string
  renderComments: (postId?: number) => JSX.Element
}

export const PostDetailDialog = ({ open, onOpenChange, post, searchQuery, renderComments }: PostDetailDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{highlightText(post?.title, searchQuery)}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>{highlightText(post?.body, searchQuery)}</p>
        {renderComments(post?.id)}
      </div>
    </DialogContent>
  </Dialog>
)

