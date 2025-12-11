import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAtom, useAtomValue } from "jotai"
import { postsTotalAtom } from "../entities/posts/model/postsAtoms"
import { Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shared/ui"
import { PostsTable } from "../widgets/posts/ui/PostsTable"
import { postsWithAuthorAtom, PostWithAuthor } from "../features/posts/model/postsViewAtoms"
import { usePostsList } from "../features/posts/model/usePostsList"
import { newPostAtom } from "../features/posts/model/postFormAtoms"
import { useTagsList } from "../entities/tags/model/useTagsList"
import { tagsAtom } from "../entities/tags/model/tagsAtoms"
import { useComments } from "../entities/comments/model/useComments"
import { useCommentActions } from "../features/comments/model/useCommentActions"
import { User, UserDetail } from "../entities/users/model/types"
import { PostAddDialog } from "../features/posts/ui/PostAddDialog"
import { PostEditDialog } from "../features/posts/ui/PostEditDialog"
import { CommentAddDialog } from "../features/comments/ui/CommentAddDialog"
import { CommentEditDialog } from "../features/comments/ui/CommentEditDialog"
import { PostDetailDialog } from "../features/posts/ui/PostDetailDialog"
import { UserDialog } from "../entities/users/ui/UserDialog"
import { PostsFilters } from "../widgets/posts/ui/PostsFilters"
import { PostsPagination } from "../widgets/posts/ui/PostsPagination"
import { commentsAtom } from "../entities/comments/model/commentsAtoms"
import { fetchUserByIdApi } from "../entities/users/api/usersApi"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const posts = useAtomValue(postsWithAuthorAtom)
  const total = useAtomValue(postsTotalAtom)
  const tags = useAtomValue(tagsAtom)
  const comments = useAtomValue(commentsAtom)
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<PostWithAuthor>(null)
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [loading, setLoading] = useState(false)
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const { fetchComments } = useComments()
  const {
    addComment: addCommentAction,
    updateComment: updateCommentAction,
    deleteComment: deleteCommentAction,
    likeComment: likeCommentAction,
  } = useCommentActions()
  const [selectedComment, setSelectedComment] = useState(null)
  const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)
  const {
    loadPosts: loadPostsFromHook,
    searchPosts: searchPostsFromHook,
    loadPostsByTag: loadPostsByTagFromHook,
    addPost: addPostFromHook,
    updatePost: updatePostFromHook,
    deletePost: deletePostFromHook,
  } = usePostsList()
  const { loadTags } = useTagsList()

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

  // 게시물 가져오기
  const loadPosts = async () => {
    setLoading(true)
    try {
      await loadPostsFromHook({ limit, skip })
    } finally {
      setLoading(false)
    }
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      loadPosts()
      return
    }
    setLoading(true)
    try {
      await searchPostsFromHook({ query: searchQuery })
    } catch (error) {
      console.error("게시물 검색 실패:", error)
    } finally {
      setLoading(false)
    }
  }
  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      loadPosts()
      return
    }
    setLoading(true)
    try {
      await loadPostsByTagFromHook({ tag })
    } catch (error) {
      console.error("태그별 게시물 가져오기 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      await addPostFromHook(newPost)
      setShowAddDialog(false)
    } catch (error) {
      console.error("게시물 추가 실패:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      if (!selectedPost) return
      await updatePostFromHook(selectedPost)
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id) => {
    try {
      await deletePostFromHook(id)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async () => {
    try {
      if (!newComment.postId) return
      await addCommentAction({ body: newComment.body, postId: newComment.postId, userId: newComment.userId })
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      await updateCommentAction(selectedComment.id, selectedComment.body)
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id, postId) => {
    try {
      await deleteCommentAction(id, postId)
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id, postId) => {
    try {
      await likeCommentAction(id, postId)
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const userData = await fetchUserByIdApi(user.id)
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    loadTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      loadPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

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
            onSearch={searchPosts}
            selectedTag={selectedTag}
            onTagChange={(value) => {
              setSelectedTag(value)
              fetchPostsByTag(value)
              updateURL()
            }}
            tags={tags}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />

          {/* 게시물 테이블 */}
          {loading ? (
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
      <PostAddDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        newPost={newPost}
        onChangeNewPost={setNewPost}
        onSubmit={addPost}
      />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        post={selectedPost}
        onChangePost={setSelectedPost}
        onSubmit={updatePost}
      />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
        newComment={newComment}
        onChangeNewComment={setNewComment}
        onSubmit={addComment}
      />

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
        comment={selectedComment}
        onChangeComment={setSelectedComment}
        onSubmit={updateComment}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        post={selectedPost}
        searchQuery={searchQuery}
        comments={comments}
        onAddComment={(id) => {
          setNewComment((prev) => ({ ...prev, postId: id }))
          setShowAddCommentDialog(true)
        }}
        onLikeComment={likeComment}
        onEditComment={(comment) => {
          setSelectedComment(comment)
          setShowEditCommentDialog(true)
        }}
        onDeleteComment={deleteComment}
      />

      {/* 사용자 모달 */}
      <UserDialog open={showUserModal} onOpenChange={setShowUserModal} user={selectedUser} />
    </Card>
  )
}

export default PostsManager
