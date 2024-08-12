const baseUrl = 'https://localhost:5001';
const uid = 1;

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getFilteredPosts = async (id) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/posts/category/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Allow: 'GET, POST, PUT, DELETE',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const editPost = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
});

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

const getUserPosts = () => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/posts/user/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getPostsWithTags = () => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/posts_and_tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSinglePostWithTags = (id) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/posts_and_tags/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPosts, createPost, editPost, deletePost, getFilteredPosts, getSinglePostWithTags, getPostsWithTags, getUserPosts,
};
