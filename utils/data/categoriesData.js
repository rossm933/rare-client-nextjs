const baseUrl = 'https://localhost:5001';

export const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/categories`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export const createCategory = () => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/categories`, {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
