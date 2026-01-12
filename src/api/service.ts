import type { Post } from "../types/post";

const BASE_URL = "http://localhost:3001";

/// http wrapper functions

// GET
async function doGet<T>(path: string): Promise<T> {
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

// POST
async function doPost<T>(path: string, data: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data) // 요청 본문에 데이터를 JSON 문자열로 변환하여 전송
  });

  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  return await response.json() as T;
}

// PUT
async function doPut<T>(path: string, data: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  return await response.json() as T;
}

// DELETE
async function doDelete<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json'
    }
  })
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  return await response.json() as T;
}


/// api functions

// list
export function fetchPosts(): Promise<Post[]> {
  return doGet<Post[]>('/posts');
}

// view
export function fetchPost(id: string): Promise<Post> {
  return doGet<Post>(`/posts/${id}`);
}

// create
export function createPost(postData: Omit<Post, 'id'>): Promise<Post> {
  return doPost<Post>('/posts', postData);
}

// put
export function updatePost(id: string, postData: Post): Promise<Post> {
  return doPut<Post>(`/posts/${id}`, postData);
}

// delete
export function deletePost(id: string): Promise<void> {
  return doDelete<void>(`/posts/${id}`);
}