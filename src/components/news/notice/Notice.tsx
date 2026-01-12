import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "@/types/post";
import {
  createPost,
  fetchPost,
  fetchPosts,
  updatePost,
  deletePost,
} from "@/api/service";
import NoticeEditPopup from "@/components/news/notice/NoticeEditPopup";
import NoticeViewPopup from "@/components/news/notice/NoticeViewPopup";
function Notice() {
  const navigate = useNavigate();
  // list
  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedId] = useState<string | null>(null);

  // view
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // popup
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null); // 편집 중인 게시글

  // useEffect
  // 렌더링 이후에 실행할 코드를 정의한다
  // useEffect는 "상태 변화에 반응하는 트리거"
  const reloadPosts = async () => {
    try {
      const data = await fetchPosts();
      const top = data.slice(0, 20);

      setPosts(top);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reloadPosts();
  }, []);

  const loadPost = async (id: string) => {
    try {
      const data = await fetchPost(id);
      setSelectedPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedId === null) {
      setSelectedPost(null);
      return;
    }
    loadPost(selectedId);
  }, [selectedId]);

  const handleCreate = () => {
    setEditingPost(null); // 새로 작성 모드
    setIsEditPopupOpen(true);
  };

  // 목록 항목 클릭 핸들러 - 조회 팝업 열기
  const handlePostClick = async (id: string) => {
    try {
      // 게시글 데이터 로드
      const data = await fetchPost(id);
      setSelectedPost(data);
      // 조회 팝업 열기
      setIsViewPopupOpen(true);
    } catch (error) {
      console.error("게시글 로드 오류:", error);
    }
  };


  const handleShowDetail = async (id: string) => {
    try {
      navigate(`/news/notice/${id}`);
    } catch (error) {
      console.error("게시글 로드 오류:", error);
    }
  };

  // 조회 팝업 닫기 핸들러
  const handleViewClose = () => {
    setIsViewPopupOpen(false);
    setSelectedPost(null);
  };

  // 편집 버튼 클릭 핸들러
  const handleEdit = () => {
    if (selectedPost) {
      setEditingPost(selectedPost); // 편집할 게시글 설정
      setIsViewPopupOpen(false); // 조회 팝업 닫기
      setIsEditPopupOpen(true); // 편집 팝업 열기
    }
  };

  // 삭제 버튼 클릭 핸들러
  const handleDelete = async () => {
    if (!selectedPost) return;

    // 삭제 확인
    const confirmed = window.confirm(
      `정말로 "${selectedPost.title}" 게시글을 삭제하시겠습니까?`
    );
    if (!confirmed) return;

    try {
      await deletePost(selectedPost.id);
      // 삭제 성공 시 조회 팝업 닫기 및 목록 새로고침
      setIsViewPopupOpen(false);
      setSelectedPost(null);
      await reloadPosts();
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleSave = async (postData: Post) => {
    try {
      if (editingPost) {
        // 편집 모드: 기존 게시글 수정
        await updatePost(postData.id, postData);
      } else {
        // 새로 작성 모드: 새 게시글 생성
        await createPost({
          title: postData.title,
          body: postData.body,
          userId: postData.userId,
        });
      }

      setIsEditPopupOpen(false);
      setEditingPost(null);
      await reloadPosts();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleCancel = () => {
    setIsEditPopupOpen(false);
    setEditingPost(null);
  };

  return (
    <>
      <div id="notice">
        <h1>Notice</h1>
        <hr />
        <section id="notice-list">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <h2 style={{ margin: 0 }}>Notice List</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => handleCreate()}>Create</button>
              <button onClick={() => reloadPosts()}>Reload</button>
            </div>
          </div>

          <table
            id="notice-list-items"
            style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <th
                  style={{ padding: "12px", width: "100px", textAlign: "left" }}
                >
                  ID
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>Title</th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((p) => {
                  return (
                    <tr
                      key={p.id}
                      id="notice-list-item"
                      style={{
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                      }}                      
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f9f9f9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <td onClick={() => handlePostClick(p.id)} style={{ padding: "12px" }}>{p.id}</td>
                      <td onClick={() => handleShowDetail(p.id)} style={{ padding: "12px" }}>{p.title}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      </div>

      {/* 작성/편집 팝업 */}
      {isEditPopupOpen && (
        <NoticeEditPopup
          initialPost={editingPost || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* 조회 팝업 */}
      {isViewPopupOpen && selectedPost && (
        <NoticeViewPopup
          post={selectedPost}
          onClose={handleViewClose}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default Notice;
