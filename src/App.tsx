import { Link } from "react-router-dom";

export default function App() {

  return(
    <div id="home" style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // ↕
      alignItems: 'center', // ↔
      gap: '20px'
    }}>
      <h1>Home</h1>
      <Link to="/news">Go to News</Link>
    </div>
  )
}