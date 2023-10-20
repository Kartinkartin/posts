import { IPost } from "../../services/types/data";

type TOptions = { 
  headers?: { 'Content-type': string; }; 
  method?: string; 
  body?: string; 
}

export interface TResponse<T> extends Response {
  json(): Promise<T>
}

const config = {
  baseUrl: "https://jsonplaceholder.typicode.com",
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
};

function checkRes<T>(res: TResponse<T>) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject([`Ошибка ${res.status}`, res.json()]);
}

function request(url: string, options: TOptions) {
  return fetch(url, options)
    .then(checkRes)
}

export async function getUsers() {
  return await request(`${config.baseUrl}/users`, {
    method: 'GET',
  });
}

export async function getPosts() {
  return await request(`${config.baseUrl}/posts`, {
    method: 'GET',
  });
}

export async function deletePostReq(id: number) {
  return await request(`${config.baseUrl}/posts/${id}`, {
    method: 'DELETE',
  });
}

export async function getCommentsPost(id: number) {
  return await request(`${config.baseUrl}/comments?postId=${id}`, {
    method: 'GET',
  });
}

export async function modePost(data: IPost) {
  return await request(`${config.baseUrl}/posts/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify({...data}),
    headers: config.headers,
  });
}

export async function postNewPost(data: IPost) {
  return await request(`${config.baseUrl}/posts`, {
    method: 'POST',
    body: JSON.stringify({...data}),
    headers: config.headers,
  });
}
