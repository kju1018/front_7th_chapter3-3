import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../../shared/ui"
import { useAddPost } from "../model/useAddPost"

interface PostAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PostAddDialog = ({ open, onOpenChange }: PostAddDialogProps) => {
  const { form, setForm, submitting, submit } = useAddPost()

  const handleSubmit = async () => {
    await submit()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: Number(e.target.value) })}
          />
          <Button onClick={handleSubmit} disabled={submitting}>
            게시물 추가
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

