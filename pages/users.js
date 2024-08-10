import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Link from 'next/link';
import { getUsers } from '../utils/data/usersData';

export default function ViewUsers() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers().then(setUser);
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>UserName</th>
          <th>Name</th>
          <th>Email</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {user.map((u) => (
          <tr key={`users-${u.id}`} data-id={u.id}>
            <td>{u.username}</td>
            <td>{u.firstName} {u.lastName}</td>
            <td>{u.email}</td>
            <td>
              <Link passHref href={`/users/${u.id}`}>Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
