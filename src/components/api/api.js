const config = {
  baseUrl: "https://jsonplaceholder.typicode.com",
};

function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject([`Ошибка ${res.status}`, res.json()]);
}

function request(url, options) {
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

export async function deletePostReq(id) {
  return await request(`${config.baseUrl}/posts/${id}`, {
    method: 'DELETE',
  });
}

export async function getCommentsPost(id) {
  return await request(`${config.baseUrl}/comments?postId=${id}`, {
    method: 'GET',
  });
}
