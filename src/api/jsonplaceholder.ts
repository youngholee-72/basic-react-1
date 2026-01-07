import type { Post } from "../types/post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);

  // return await response.json() as Post[];
  return await response.json() as T;
}

export function fetchPosts(): Promise<Post[]> {
  return get<Post[]>('/posts');
}

export function fetchPost(id: number): Promise<Post> {
  return get<Post>(`/posts/${id}`);
}