import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../../shared/ui"
import type { PostWithAuthor } from "../../../../entities/posts/model/types"
import { useEditPost } from "../model/useEditPost"

interface PostEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: PostWithAuthor | null
}

export const PostEditDialog = ({ open, onOpenChange, post }: PostEditDialogProps) => {
  const { form, setForm, submitting, submit } = useEditPost({ post })

  const handleSubmit = async () => {
    await submit()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <Button onClick={handleSubmit} disabled={submitting}>
            게시물 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
