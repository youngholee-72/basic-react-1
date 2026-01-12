import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

export default function News() {
  
  const [selectedMenu, setSelectedMenu] = useState<string>('');

  return (    
    <>
      <div id="sidebar">
        <h1>
          <Link to="/news" onClick={() => setSelectedMenu('')} style={{ color: 'black', textDecoration: 'none'}}>News</Link>
        </h1>
        <div id="home-link" 
          style = {{
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
              <Link to={`/news/notice`} onClick={() => setSelectedMenu('notice')} style={{ backgroundColor: selectedMenu === 'notice' ? '#d2d2d2' : '#f7f7f7' }} >Notice</Link>
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
