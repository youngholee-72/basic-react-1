import DOMPurify from 'dompurify';

interface ConfirmProps {
  message?: string; // 확인 메시지 (선택적)
  onConfirm: () => void; // 확인 버튼 클릭 시 실행될 함수
  onCancel: () => void; // 취소 버튼 클릭 시 실행될 함수
}

function Confirm({ message = "정말로 삭제하시겠습니까?", onConfirm, onCancel }: ConfirmProps) {
  const formattedMessage = message.replace(/\n/g, '<br />');
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
      onClick={onCancel} // 배경 클릭 시 취소
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()} // 팝업 내부 클릭 시 닫히지 않도록
      >
        {/* 메시지 영역 */}
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formattedMessage) }}
          style={{
            marginBottom: "24px",
            fontSize: "16px",
            color: "#333",
            textAlign: "center",
          }}
        >
        </div>

        {/* 버튼 영역 */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Cancel 버튼 */}
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f5f5f5",
              color: "#333",
              cursor: "pointer",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            Cancel
          </button>
          {/* Ok 버튼 */}
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ff4444",
              color: "white",
              cursor: "pointer",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            Ok
          </button>
        </div>

      </div>
    </div>
  );
}

export default Confirm;