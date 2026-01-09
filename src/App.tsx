import { useState } from "react";
import JsonApp from "./JsonApp";
import JsonplaceholderApp from "./JsonplaceholderApp";

function App() {

  const [activeTab, setActiveTab] = useState<'json-server'|'json-jsonplaceholder'>('json-server');
  
  return (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, borderBottom: '1px solid #ddd' }}>
            <button 
              onClick={() => setActiveTab('json-server')}
              style={{ 
                padding: '8px 16px', 
                border: 'none', 
                background: activeTab === 'json-server' ? '#0078d4' : 'transparent',
                color: activeTab === 'json-server' ? 'white' : '#0078d4',
                cursor: 'pointer',
                borderBottom: activeTab === 'json-server' ? '2px solid #0078d4' : '2px solid transparent'
              }}
            >
              JSON-SERVER
            </button>
            <button 
              onClick={() => setActiveTab('json-jsonplaceholder')}
              style={{ 
                padding: '8px 16px', 
                border: 'none', 
                background: activeTab === 'json-jsonplaceholder' ? '#0078d4' : 'transparent',
                color: activeTab === 'json-jsonplaceholder' ? 'white' : '#0078d4',
                cursor: 'pointer',
                borderBottom: activeTab === 'json-jsonplaceholder' ? '2px solid #0078d4' : '2px solid transparent'
              }}
            >
              JSON-PLACEHOLDER
            </button>
          </div>

      { activeTab == 'json-server' && <JsonApp />}
      { activeTab == 'json-jsonplaceholder' && <JsonplaceholderApp />}
    </>
  );
}

export default App;
