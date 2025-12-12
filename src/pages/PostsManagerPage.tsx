import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAtomValue } from "jotai"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { PostsTable } from "../widgets/posts/ui/PostsTable"
import { PostWithAuthor } from "../features/posts/model/postsViewAtoms"
import { usePostsList } from "../features/posts/model/usePostsList"
import { usePostsListQuery } from "../features/posts/model/usePostsListQuery"
import { useTagsList } from "../entities/tags/model/useTagsList"
import { tagsAtom } from "../entities/tags/model/tagsAtoms"
import { User } from "../entities/users/model/types"
import { PostAddDialog } from "../features/posts/add-post/ui/PostAddDialog"
import { PostEditDialog } from "../features/posts/edit-post/ui/PostEditDialog"
import { CommentAddDialog } from "../features/comments/add-comment/ui/CommentAddDialog"
import { CommentEditDialog } from "../features/comments/edit-comment/ui/CommentEditDialog"
import { PostDetailDialog } from "../features/posts/view-detail/ui/PostDetailDialog"
import { UserDialog } from "../features/users/view-detail/ui/UserDialog"
import { PostsFilters } from "../widgets/posts/ui/PostsFilters"
import { PostsPagination } from "../widgets/posts/ui/PostsPagination"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const tags = useAtomValue(tagsAtom)
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<PostWithAuthor | null>(null)
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const [selectedComment, setSelectedComment] = useState(null)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const { deletePost: deletePostFromHook } = usePostsList()
  useTagsList()

  const { posts, total, isLoading: postsLoading } = usePostsListQuery({
    skip,
    limit,
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
  })

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 게시물 삭제
  const deletePost = async (id) => {
    try {
      await deletePostFromHook(id)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = (user: User) => {
    setSelectedUserId(user.id)
    setShowUserModal(true)
  }

  useEffect(() => {
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag, searchQuery])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostsFilters
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={updateURL}
            selectedTag={selectedTag}
            onTagChange={(value) => {
              setSelectedTag(value)
              updateURL()
            }}
            tags={tags}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />

          {/* 게시물 테이블 */}
          {postsLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onTagClick={(tag) => {
                setSelectedTag(tag)
                updateURL()
              }}
              onOpenUser={openUserModal}
              onOpenPostDetail={openPostDetail}
              onEditPost={(post) => {
                setSelectedPost(post)
                setShowEditDialog(true)
              }}
              onDeletePost={deletePost}
            />
          )}

          {/* 페이지네이션 */}
          <PostsPagination
            skip={skip}
            limit={limit}
            total={total}
            onChangeLimit={(value) => setLimit(value)}
            onPrev={() => setSkip(Math.max(0, skip - limit))}
            onNext={() => setSkip(skip + limit)}
          />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog open={showEditDialog} onOpenChange={setShowEditDialog} post={selectedPost} />

      {/* 댓글 추가 대화상자 */}
      {selectedPost && (
        <CommentAddDialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog} postId={selectedPost.id} />
      )}

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
        comment={selectedComment}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        post={selectedPost}
        searchQuery={searchQuery}
        onAddComment={() => {
          setShowAddCommentDialog(true)
        }}
        onEditComment={(comment) => {
          setSelectedComment(comment)
          setShowEditCommentDialog(true)
        }}
      />

      {/* 사용자 모달 */}
      <UserDialog open={showUserModal} onOpenChange={setShowUserModal} userId={selectedUserId} />
    </Card>
  )
}

export default PostsManager
