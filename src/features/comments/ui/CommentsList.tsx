import { Plus, ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import type { Comment } from "../../../entities/comments/model/types"

interface CommentsListProps {
  postId?: number
  comments: Record<number, Comment[]>
  searchQuery: string
  onAddClick: () => void
  onLike: (id: number, postId: number) => void
  onEdit: (comment: Comment) => void
  onDelete: (id: number, postId: number) => void
}

export const CommentsList = ({ postId, comments, searchQuery, onAddClick, onLike, onEdit, onDelete }: CommentsListProps) => {
  if (!postId) return null

  const list = comments[postId] || []

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => onAddClick()}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {list.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user?.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => onLike(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onEdit(comment)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
