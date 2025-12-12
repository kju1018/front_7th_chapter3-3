import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useAddComment } from "../add-comment/model/useAddComment"

interface CommentAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: number
}

export const CommentAddDialog = ({ open, onOpenChange, postId }: CommentAddDialogProps) => {

  const { form, updateForm, submit } = useAddComment({ postId })
  
  const handleSubmit = async() => {
    await submit()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={form.body}
            onChange={(e) => updateForm({ ...form, body: e.target.value })}
          />
          <Button onClick={handleSubmit}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 

