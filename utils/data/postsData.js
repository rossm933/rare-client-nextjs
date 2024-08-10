const baseUrl = 'https://localhost:5001';

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

const getFilteredPosts = (id) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/posts/category/${id}`, {
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
  getPosts,
  getFilteredPosts,
};
const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5000/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch('http://localhost:5000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const editPost = (id, payload) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5000/posts/${id}`, {
    method: 'PATCH',
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
  fetch(`http://localhost:5000/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getPosts, getSinglePost, createPost, editPost, deletePost,
};
