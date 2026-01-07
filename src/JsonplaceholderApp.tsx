import { useState, useEffect } from "react";
import type { Post } from "./types/post";
import { fetchPost, fetchPosts } from "./api/jsonplaceholder";

function JsonplaceholderApp() {
  // list
  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  // view
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // useEffect
  // 렌더링 이후에 실행할 코드를 정의한다
  // useEffect는 “상태 변화에 반응하는 트리거”
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPosts();
        const top = data.slice(0, 20);
        setPosts(top);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(`selectedId : ${selectedId}`);
    (async () => {
      console.log(
        "selectedId Changed so selectedPost changed, setSelectedPost cause reload again?"
      );

      if (selectedId === null) {
        setSelectedPost(null);
        return;
      }

      const data = await fetchPost(selectedId);
      setSelectedPost(data);
    })();
  }, [selectedId]);

  return (
    <>
      <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
        <h1>Posts (List + View in one screen)</h1>
        <section style={{ border: "1px solid #ddd", padding: 12 }}>
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

        {/* <section>
          {selectedId && selectedPost && (
            <>
              <h3 style={{ marginBottom: 8 }}>{selectedPost.title}</h3>
              <p style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>
                {selectedPost.body}
              </p>
              <small>
                postId: {selectedPost.id} / userId: {selectedPost.userId}
              </small>
            </>
          )}
        </section> */}
      </div>
    </>
  );
}

export default JsonplaceholderApp;
