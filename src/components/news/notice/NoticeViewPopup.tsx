import type { Post } from "@/types/post";

interface NoticeViewPopupProps {
  post: Post;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

function NoticeViewPopup({ post, onClose, onEdit, onDelete }: NoticeViewPopupProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      // onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "700px",
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
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* 편집 버튼 */}
            {onEdit && (
              <button
                onClick={onEdit}
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
            )}
            {/* 삭제 버튼 */}
            {onDelete && (
              <button
                onClick={onDelete}
                style={{
                  padding: "4px 12px",
                  backgroundColor: "#ff4444",
                  color: "white",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                삭제
              </button>
            )}
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
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
    </div>
  );
}

export default NoticeViewPopup;