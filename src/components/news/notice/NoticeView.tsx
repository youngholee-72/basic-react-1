import { deletePost, fetchPost, fetchPosts } from "@/api/service";
import Confirm from "@/components/common/Confirm";
import type { Post } from "@/types/post";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function NoticeView() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Confirm 팝업 표시 여부 상태

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPosts().then((data) => {
        setAllPosts(data);
      });

      fetchPost(id).then((data) => {
        setPost(data);
      });
    }
  }, [id]);

  const { prevPost, nextPost } = useMemo(() => {
    if (!id || allPosts.length === 0) return { prevPost: null, nextPost: null };

    const currentIndex = allPosts.findIndex((p) => p.id === id);
    if (currentIndex === -1) return { prevPost: null, nextPost: null };

    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost =
      currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return { prevPost, nextPost };
  }, [id, allPosts]);

  // 이전글/다음글 클릭 핸들러
  const handlePrevClick = () => {
    if (prevPost) {
      navigate(`/news/notice/${prevPost.id}`);
    }
  };

  const handleNextClick = () => {
    if (nextPost) {
      navigate(`/news/notice/${nextPost.id}`);
    }
  };

  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsConfirmOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (post) {
        await deletePost(post.id);
        navigate("/news/notice");
      }
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsConfirmOpen(false);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        style={{
          padding: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            // width: "90%",
            // maxWidth: "700px",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 영역 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              paddingBottom: "16px",
              borderBottom: "1px solid #eee",
            }}
          >
            <h2 style={{ margin: 0 }}>공지 상세</h2>
            <div style={{ display: "flex", gap: "8px" }}>
              {/* 편집 버튼 추가 */}
              <button
                onClick={() => navigate(`/news/notice/${id}/edit`)}
                style={{
                  padding: "4px 12px",
                  backgroundColor: "#3992ff",
                  color: "white",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                편집
              </button>

              {/* 삭제 버튼 */}
              <button
                onClick={() => handleDeleteClick()}
                style={{
                  padding: "4px 12px",
                  backgroundColor: "#ff4444",
                  color: "white",
                }}
              >
                삭제
              </button>

              {/* 닫기 버튼 */}
              <button
                onClick={() => navigate("/news/notice")}
                style={{
                  padding: "4px 12px",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                닫기
              </button>
              
            </div>
          </div>

          {/* 제목 */}
          <div style={{ marginBottom: "20px" }}>
            <h3
              style={{
                margin: 0,
                marginBottom: "8px",
                fontSize: "20px",
                fontWeight: 600,
                color: "#333",
              }}
            >
              {post.title}
            </h3>
          </div>

          {/* 내용 */}
          <div style={{ marginBottom: "24px" }}>
            <p
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.6",
                color: "#555",
                margin: 0,
              }}
            >
              {post.body}
            </p>
          </div>

          {/* 메타 정보 */}
          <div
            style={{
              paddingTop: "16px",
              borderTop: "1px solid #eee",
              fontSize: "14px",
              color: "#888",
            }}
          >
            <div style={{ marginBottom: "4px" }}>
              <strong>게시글 ID:</strong> {post.id}
            </div>
            <div>
              <strong>사용자 ID:</strong> {post.userId}
            </div>
          </div>
        </div>

        {/* 이전글/다음글 네비게이션 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            gap: "8px",
          }}
        >
          {/* 이전 글 */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "12px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #eee",
              cursor: prevPost ? "pointer" : "not-allowed",
              opacity: prevPost ? 1 : 0.5,
            }}
            onClick={handlePrevClick}
          >
            <div style={{ fontWeight: 600, minWidth: "60px" }}>이전 글</div>
            <div style={{ flex: 1, color: prevPost ? "#333" : "#999" }}>
              {prevPost ? prevPost.title : "이전 글이 없습니다"}
            </div>
          </div>

          {/* 현재 글 */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              border: "1px solid #eee",
              cursor: "default",
              opacity: 0.8,
            }}
          >
            <div style={{ fontWeight: 600, minWidth: "60px" }}>현재 글</div>
            <div style={{ flex: 1, color: "#333" }}>{post.title}</div>
          </div>

          {/* 다음 글 */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "12px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #eee",
              cursor: nextPost ? "pointer" : "not-allowed",
              opacity: nextPost ? 1 : 0.5,
            }}
            onClick={handleNextClick}
          >
            <div style={{ fontWeight: 600, minWidth: "60px" }}>다음 글</div>
            <div style={{ flex: 1, color: nextPost ? "#333" : "#999" }}>
              {nextPost ? nextPost.title : "다음 글이 없습니다"}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm 팝업 - isConfirmOpen이 true일 때만 표시 */}
      {isConfirmOpen && (
        <Confirm
          message={`게시글: "${post.title}"\n정말로 삭제하시겠습니까?`}
          onConfirm={handleDelete}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
}
