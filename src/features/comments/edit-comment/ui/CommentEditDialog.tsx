import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../../shared/ui"
import type { Comment } from "../../../../entities/comments/api/commentsApi"
import { useEditComment } from "../model/useEditComment"

interface CommentEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  comment: Comment | null
}

export const CommentEditDialog = ({ open, onOpenChange, comment }: CommentEditDialogProps) => {
  const { body, setBody, submit } = useEditComment({ comment })

  const handleSubmit = async () => {
    await submit()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button onClick={handleSubmit}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
