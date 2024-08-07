import Link from 'next/link';
import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import getPosts from '../utils/data/postsData';

export default function ViewPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);
  return (
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
  );
}
