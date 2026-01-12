import { Link, Outlet } from "react-router-dom";

export default function News() {
  
  return (
    <>
      <div id="sidebar">
        <h1><Link to="/news" style={{
          color: 'black',
          textDecoration: 'none',
        }}>News</Link></h1>
        <div id="home-link" style = {{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textDecoration: 'none',
        }}>
          <Link to="/" style={{
            color: 'black',
            textDecoration: 'none',            
          }}>Home</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={`/news/notice`}>Notice</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
