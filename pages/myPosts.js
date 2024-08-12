import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Link from 'next/link';
import { getPostsWithTags } from '../utils/data/postsData';

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const uid = 1;

  useEffect(() => {
    getPostsWithTags().then(setPosts);
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Publish Date</th>
          <th>Image</th>
          <th>Content</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {posts.filter((p) => p.userId === uid) // Filter posts by authorId
          .map((p) => (
            <tr key={`p-${p.id}`} data-id={p.id}>
              <td>{p.title}</td>
              <td>{new Date(p.publishedOn).toLocaleDateString()}</td>
              <td>{(p.imageUrl ? p.imageUrl : 'No image')}</td>
              <td>{p.content}</td>
              <td>
                {p.tags ? p.tags.map((tag) => (
                  <span>
                    {`${tag.label}, `}
                  </span>
                ))
                  : 'No tags'}
              </td>
              <td>
                <Link passHref href={`/myPosts/${p.id}`}>Edit</Link>
              </td>
              <td>
                <Button>Delete</Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
