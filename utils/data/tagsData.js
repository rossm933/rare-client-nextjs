export const getTags = () => new Promise((resolve, reject) => {
  fetch('https://localhost:5001/tags', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data).map((tag, index) => ({ ...tag, id: tag.id || index })));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export const createTag = (payload) => new Promise((resolve, reject) => {
  fetch('https://localhost:5001/tags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export const getPostTags = (id) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5000/posts/${id}/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
