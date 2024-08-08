export const getTags = () => new Promise((resolve, reject) => {
  fetch('http://localhost:5000/tags', {
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
  fetch('http://localhost:5000/tags', {
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
