const config = {
    baseUrl: 'https://jsonplaceholder.typicode.com'
}

function checkRes(res: any) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject([`Ошибка ${res.status}`, res.json()]);
  }

export async function getUsers() {
    return await fetch(`${config.baseUrl}/users`)
        .then(checkRes)
}

export async function getPosts() {
    return await fetch(`${config.baseUrl}/posts`)
        .then(checkRes)
}
