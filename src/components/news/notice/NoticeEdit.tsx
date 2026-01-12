import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "@/types/post";
import { createPost, fetchPost, updatePost } from "@/api/service";

export default function NoticeEdit() {
  const { id } = useParams(); // URL에서 id 파라미터 가져오기 (편집 모드일 때만 존재)
  const navigate = useNavigate();
  
  // 폼 입력값 상태 관리
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 편집 모드인지 확인 (id가 있으면 편집 모드)
  const isEditMode = !!id;

  // 편집 모드일 때 기존 게시글 데이터 로드
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchPost(id)
        .then((data) => {
          setTitle(data.title);
          setBody(data.body);
          setUserId(data.userId);
        })
        .catch((error) => {
          console.error("게시글 로드 오류:", error);
          setErrorMessage("게시글을 불러오는 중 오류가 발생했습니다.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  // 저장 버튼 클릭 핸들러
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

      if (isEditMode && id) {
        // 편집 모드: 기존 게시글 수정
        const postData: Post = {
          id: id,
          title: title.trim(),
          body: body.trim(),
          userId: userId,
        };
        await updatePost(id, postData);
      } else {
        // 새로 작성 모드: 새 게시글 생성
        await createPost({
          title: title.trim(),
          body: body.trim(),
          userId: userId,
        });
      }

      // 저장 성공 시 목록 페이지로 이동
      navigate("/news/notice");
    } catch (error) {
      // 에러 발생 시 에러 메시지 표시
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "저장 중 오류가 발생했습니다."
      );
      console.error("저장 오류:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    navigate("/news/notice");
  };

  // 로딩 중일 때 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
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
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
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
          <h2 style={{ margin: 0 }}>
            {isEditMode ? "공지 편집" : "새 공지 작성"}
          </h2>
          <button
            onClick={handleCancel}
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
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 500,
              }}
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
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 500,
              }}
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
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 500,
              }}
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

          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f5f5f5",
                color: "#333",
                cursor: isSaving ? "not-allowed" : "pointer",
                border: "none",
                borderRadius: "4px",
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
                border: "none",
                borderRadius: "4px",
                opacity: isSaving ? 0.6 : 1,
              }}
            >
              {isSaving ? "저장 중..." : isEditMode ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}