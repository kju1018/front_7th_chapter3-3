import { Search } from "lucide-react"
import type { Tag } from "../../../entities/tags/model/types"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface PostsFiltersProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onSearch: () => void
  selectedTag: string
  onTagChange: (value: string) => void
  tags: Tag[]
  sortBy: string
  sortOrder: string
  onSortByChange: (value: string) => void
  onSortOrderChange: (value: string) => void
}

export const PostsFilters = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  selectedTag,
  onTagChange,
  tags,
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: PostsFiltersProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
      </div>
      <Select value={selectedTag} onValueChange={onTagChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={onSortByChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={onSortOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

