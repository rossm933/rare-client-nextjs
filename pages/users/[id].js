import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getSingleUser } from '../../utils/data/usersData';

export default function UserDetails() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;
  console.warn(id);

  useEffect(() => {
    getSingleUser(id).then(setUserDetails);
  }, [id]);

  return (
    <div>
      {userDetails ? (
        <Table>
          <tbody>
            <tr>
              <th>First Name</th>
              <td>{userDetails.firstName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{userDetails.lastName}</td>
            </tr>
            <tr>
              <th>User Image</th>
              <td>
                {userDetails.userImage ? (
                  <img src={userDetails.userImage} alt="User" style={{ width: '100px', height: '100px' }} />
                ) : (
                  'No image available'
                )}
              </td>
            </tr>
            <tr>
              <th>Bio</th>
              <td>{userDetails.bio}</td>
            </tr>
            <tr>
              <th>Created On</th>
              <td>{new Date(userDetails.createdOn).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
