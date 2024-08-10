import Link from 'next/link';
import { Dropdown, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getPosts, getFilteredPosts } from '../utils/data/postsData';
import { getCategories } from '../utils/data/categoriesData';

export default function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
    if (selectedCategory === 'All') {
      getPosts().then(setPosts);
    } else {
      getFilteredPosts(selectedCategory).then(setPosts);
    }
    return selectedCategory;
  }, [selectedCategory]);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter by Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectedCategory('All')}>All</Dropdown.Item>
          {categories.map((category) => (
            <Dropdown.Item
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Published On</th>
            <th>Content</th>
            <th>Approved?</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={`posts-${p.id}`}>
              <th scope="row">{p.id}</th>
              <td>{p.title}</td>
              <td>{p.publishedOn}</td>
              <td>{p.content}</td>
              <td>{p.approved}</td>
              <td>
                <Link passHref href={`/posts/${p.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
