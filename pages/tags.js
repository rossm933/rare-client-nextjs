import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTags } from '../utils/data/tagsData';

function ViewTags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags().then(setTags).catch((error) => console.error('Error fetching tags:', error));
  }, []);
  return (
    <>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Tag Labels</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((p, index) => (
              <tr key={`tags-${p.id || index}`}>
                <td>{p.label}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
      </div>

      <Link href="/tags/new" passHref>
        <Button>Add A Tag</Button>
      </Link>
    </>
  );
}

export default ViewTags;
