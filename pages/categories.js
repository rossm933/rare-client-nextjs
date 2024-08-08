import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import getCategories from '../utils/data/categoriesData';

export default function ViewCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
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
              {' '}
              {/* Ensure each row has a unique key */}
              <td>{c.label}</td> {/* Use <td> instead of <th> for table data */}
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
