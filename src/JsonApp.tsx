import { useState, useEffect } from "react";
import type { Post } from "./types/post";
import { fetchPost, fetchPosts } from "./api/service";

function JsonApp() {
  // list
  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  // view
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // useEffect
  // 렌더링 이후에 실행할 코드를 정의한다
  // useEffect는 “상태 변화에 반응하는 트리거”
  const reloadPosts = async() => {
    try {
      const data = await fetchPosts();
      const top = data.slice(0, 20);

      setPosts(top);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    reloadPosts();
  }, []);

  const loadPost = async (id: number) => {
    try{
      const data = await fetchPost(id);
      setSelectedPost(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (selectedId === null) {
      setSelectedPost(null);
      return;
    }
    loadPost(selectedId);
  }, [selectedId]);

  return (
    <>
      <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
        <h1>Posts (List + View in one screen)</h1>
        <section style={{ border: "1px solid #ddd", padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <h2 style={{ margin: 0 }}>List</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => reloadPosts()}>Reload</button>
            </div>
          </div>

          <ul>
            {posts &&
              posts.map((p) => {
                return (
                  <li key={p.id}>
                    <button onClick={() => setSelectedId(p.id)}>
                      {p.title}
                    </button>
                    {selectedId && selectedId === p.id && (
                      <section
                        style={{
                          border: "1px solid #ddd",
                          padding: 12,
                          marginTop: 12,
                          marginBottom: 12,
                        }}
                      >
                        {selectedPost && (
                          <>
                            <h3 style={{ marginBottom: 8 }}>
                              {selectedPost.title}
                            </h3>
                            <p style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>
                              {selectedPost.body}
                            </p>
                            <small>
                              postId: {selectedPost.id} / userId:{" "}
                              {selectedPost.userId}
                            </small>
                          </>
                        )}
                      </section>
                    )}
                  </li>
                );
              })}
          </ul>
        </section>
      </div>
    </>
  );
}

export default JsonApp;
