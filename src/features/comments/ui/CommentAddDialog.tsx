import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"

interface CommentAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  newComment: { body: string; postId: number | null; userId: number }
  onChangeNewComment: (value: { body: string; postId: number | null; userId: number }) => void
  onSubmit: () => Promise<void> | void
}

export const CommentAddDialog = ({
  open,
  onOpenChange,
  newComment,
  onChangeNewComment,
  onSubmit,
}: CommentAddDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>새 댓글 추가</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={newComment.body}
          onChange={(e) => onChangeNewComment({ ...newComment, body: e.target.value })}
        />
        <Button onClick={onSubmit}>댓글 추가</Button>
      </div>
    </DialogContent>
  </Dialog>
)

