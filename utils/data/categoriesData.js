const baseUrl = "https://localhost:5001"

const getCategories = () => new Promise((resolve, reject) => {
    fetch(`${baseUrl}/categories`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });


export default getCategories;
