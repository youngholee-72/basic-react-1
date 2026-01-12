// News 페이지의 기본 정보를 보여주는 컴포넌트
export default function NewsHome() {
  return (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ marginBottom: '1rem' }}>뉴스 섹션에 오신 것을 환영합니다</h1>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        이곳에서는 다양한 뉴스와 공지사항을 확인하실 수 있습니다.
      </p>
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '1.5rem',
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>사용 가능한 메뉴</h2>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Notice</strong> - 공지사항을 확인하세요
          </li>
        </ul>
      </div>
    </div>
  );
}