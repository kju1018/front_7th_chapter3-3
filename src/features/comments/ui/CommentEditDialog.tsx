import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import type { Comment } from "../../../entities/comments/api/commentsApi"

interface CommentEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  comment: Comment | null
  onChangeComment: (value: Comment) => void
  onSubmit: () => Promise<void> | void
}

export const CommentEditDialog = ({ open, onOpenChange, comment, onChangeComment, onSubmit }: CommentEditDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>댓글 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={comment?.body || ""}
          onChange={(e) => comment && onChangeComment({ ...comment, body: e.target.value })}
        />
        <Button onClick={onSubmit}>댓글 업데이트</Button>
      </div>
    </DialogContent>
  </Dialog>
)

