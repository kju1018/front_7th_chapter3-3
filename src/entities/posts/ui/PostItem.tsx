import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import type { Post } from "../model/types"
import { Button, TableCell, TableRow } from "../../../shared/ui"

interface PostItemProps {
  post: Post
  searchQuery: string
  selectedTag: string
  onTagClick: (tag: string) => void
  onOpenUser: (user: any) => void
  onOpenPostDetail: (post: Post) => void
  onEditPost: (post: Post) => void
  onDeletePost: (id: number) => void
  renderHighlightedText: (text: string, highlight: string) => JSX.Element | null
}

export const PostItem = ({
  post,
  searchQuery,
  selectedTag,
  onTagClick,
  onOpenUser,
  onOpenPostDetail,
  onEditPost,
  onDeletePost,
  renderHighlightedText,
}: PostItemProps) => (
  <TableRow>
    <TableCell>{post.id}</TableCell>
    <TableCell>
      <div className="space-y-1">
        <div>{renderHighlightedText(post.title, searchQuery)}</div>

        <div className="flex flex-wrap gap-1">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                selectedTag === tag
                  ? "text-white bg-blue-500 hover:bg-blue-600"
                  : "text-blue-800 bg-blue-100 hover:bg-blue-200"
              }`}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TableCell>
    <TableCell>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onOpenUser((post as any).author)}>
        <img
          src={(post as any).author?.image}
          alt={(post as any).author?.username}
          className="w-8 h-8 rounded-full"
        />
        <span>{(post as any).author?.username}</span>
      </div>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{post.reactions?.likes || 0}</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{post.reactions?.dislikes || 0}</span>
      </div>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => onOpenPostDetail(post)}>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onEditPost(post)
          }}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDeletePost(post.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
)

