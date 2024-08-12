import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Image, Table } from 'react-bootstrap';
import { getSingleUser } from '../../utils/data/usersData';
import { createSub, deleteSubscription, GetSingleSubscription } from '../../utils/data/subscriptionData';

export default function UserDetails() {
  const [userDetails, setUserDetails] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setUserDetails);
  }, [id]);

  useEffect(() => {
    GetSingleSubscription(id).then(setSubscriptions);
  }, [id]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const payload = {
      id: 0,
      authorId: id,
      FollowerId: 1,
    };
    await createSub(id, payload);
    // Refresh the subscription state
    GetSingleSubscription(id).then(setSubscriptions);
  };

  const handleDelete = async () => {
    if (window.confirm('Do you wanna unsubscribe to that loser?')) {
      await deleteSubscription(subscriptions.id);
      // Refresh the subscription state
      GetSingleSubscription(id).then(setSubscriptions);
    }
  };

  return (
    <div>
      {userDetails ? (
        <>
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
                    <Image src={userDetails.userImage} alt="User" style={{ width: '100px', height: '100px' }} />
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
          {
             subscriptions.id ? (
               <Button type="button" onClick={() => handleDelete(subscriptions.id)}>Unsubscribe</Button>
             ) : (
               <Button type="button" onClick={handleSubscribe}>Subscribe</Button>
             )
          }
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
