import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import type { PostWithAuthor } from "../model/postsViewAtoms"

interface PostEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: PostWithAuthor | null
  onChangePost: (value: PostWithAuthor) => void
  onSubmit: () => Promise<void> | void
}

export const PostEditDialog = ({ open, onOpenChange, post, onChangePost, onSubmit }: PostEditDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>게시물 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={post?.title || ""}
          onChange={(e) => post && onChangePost({ ...post, title: e.target.value })}
        />
        <Textarea
          rows={15}
          placeholder="내용"
          value={post?.body || ""}
          onChange={(e) => post && onChangePost({ ...post, body: e.target.value })}
        />
        <Button onClick={onSubmit}>게시물 업데이트</Button>
      </div>
    </DialogContent>
  </Dialog>
)
