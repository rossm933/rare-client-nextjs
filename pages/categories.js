import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import getCategories from '../utils/data/categoriesData';

export default function ViewCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <>
      <Button href="/categories/new">Create New Category</Button>
      <Table>
        <thead>
          <tr>
            <th>View All Categories</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td>No categories available</td>
            </tr>
          ) : (
            categories.map((c) => (
              <tr key={c.id}>
                <td>{c.label}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}
