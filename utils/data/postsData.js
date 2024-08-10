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
