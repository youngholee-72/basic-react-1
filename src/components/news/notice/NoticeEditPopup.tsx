import { useEffect, useState } from "react";
import type { Post } from "@/types/post";

interface NoticeEditPopupProps {
  initialPost?: Post; // 편집 모드일 때 기존 게시글 데이터
  onSave: (postData: Post) => Promise<void>;
  onCancel: () => void;
}

function NoticeEditPopup({ initialPost, onSave, onCancel }: NoticeEditPopupProps) {
  // 폼 입력값 상태 관리
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title);
      setBody(initialPost.body);
      setUserId(initialPost.userId);
    }
  }, [initialPost]);


  // Save 버튼 클릭 핸들러
  const handleSave = async () => {
    // 입력값 유효성 검사
    if (!title.trim()) {
      setErrorMessage("제목을 입력해주세요.");
      return;
    }
    if (!body.trim()) {
      setErrorMessage("내용을 입력해주세요.");
      return;
    }
    if (userId <= 0) {
      setErrorMessage("유효한 사용자 ID를 입력해주세요.");
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage(null);
      
      const postData: Post = {
        id: initialPost?.id || '0',
        title: title.trim(),
        body: body.trim(),
        userId: userId,
      };

      // 폼 데이터 저장
      await onSave(postData);

      // 성공 시 폼 초기화 (새로 작성 모드일 때만)
      if (!initialPost) {
        setTitle("");
        setBody("");
        setUserId(1);
      }

    } catch (error) {
      // 에러 발생 시 에러 메시지 표시
      setErrorMessage(error instanceof Error ? error.message : "저장 중 오류가 발생했습니다.");
      console.error("저장 오류:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel 버튼 클릭 핸들러
  const handleCancel = () => {
    // 폼 초기화
    setTitle("");
    setBody("");
    setUserId(1);
    setErrorMessage(null);
    // 팝업 닫기
    onCancel();
  };

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
      // onClick={handleCancel}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginTop: 0, marginBottom: "20px" }}>새 공지 작성</h2>

        {/* 에러 메시지 표시 */}
        {errorMessage && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "#fee",
              color: "#c33",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          >
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="notice-title"
              style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
            >
              제목
            </label>
            <input
              id="notice-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
              disabled={isSaving}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="notice-body"
              style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
            >
              내용
            </label>
            <textarea
              id="notice-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                resize: "vertical",
              }}
              disabled={isSaving}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="notice-userId"
              style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
            >
              사용자 ID
            </label>
            <input
              id="notice-userId"
              type="number"
              value={userId}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value > 0) {
                  setUserId(value);
                }
              }}
              min="1"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
              disabled={isSaving}
            />
          </div>

          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f5f5f5",
                color: "#333",
                cursor: isSaving ? "not-allowed" : "pointer",
                opacity: isSaving ? 0.6 : 1,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                padding: "8px 16px",
                backgroundColor: "#3992ff",
                color: "white",
                cursor: isSaving ? "not-allowed" : "pointer",
                opacity: isSaving ? 0.6 : 1,
              }}
            >
              {isSaving ? "저장 중..." : initialPost ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoticeEditPopup;