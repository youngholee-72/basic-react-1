import type { Post } from "../types/post";

const BASE_URL = "http://localhost:3001";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type':'application/json'
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);

  // return await response.json() as Post[];
  return await response.json() as T;
}

// list
export function fetchPosts(): Promise<Post[]> {
  return get<Post[]>('/posts');
}

// view
export function fetchPost(id: number): Promise<Post> {
  return get<Post>(`/posts/${id}`);
}
