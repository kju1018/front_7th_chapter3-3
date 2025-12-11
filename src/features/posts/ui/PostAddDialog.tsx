import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import type { AddPostPayload } from "../../../entities/posts/model/types"

interface PostAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  newPost: AddPostPayload
  onChangeNewPost: (value: AddPostPayload) => void
  onSubmit: () => Promise<void> | void
}

export const PostAddDialog = ({ open, onOpenChange, newPost, onChangeNewPost, onSubmit }: PostAddDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => onChangeNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => onChangeNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => onChangeNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={onSubmit}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

