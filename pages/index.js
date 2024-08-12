import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { getSingleUser } from '../utils/data/usersData';
import { getPosts } from '../utils/data/postsData';
import { deleteSubscription, getUserSubscribers } from '../utils/data/subscriptionData';

function Home() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [userSubs, setUserSubs] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserSubscribers(1).then(setUserSubs);
    getPosts().then(setPosts);
    getSingleUser(1).then(setUser);
  }, []);

  useEffect(() => {
    setUserPosts(posts.filter((p) => p.userId === 1));
  }, [posts]);

  const handleDelete = async (id) => {
    if (window.confirm('Do you wanna unsubscribe to that loser?')) {
      deleteSubscription(id)
        .then(() => getUserSubscribers(1)).then(setUserSubs);
    }
  };

  return (
    <>
      <h3>{user.firstName} {user.lastName}</h3>
      <div>
        <Image src={user.userImage} />
        <span>{user.username}</span>
        <div>
          <span>{user.bio}</span>
        </div>
        <div>
          Posts:
          <ul>
            {userPosts.map((post) => (
              <li key={post.id}>{post.content}</li>
            ))}
          </ul>
          Following:
          <ul>
            {userSubs.length > 0 ? (
              userSubs.map((sub) => (
                // eslint-disable-next-line react/no-unescaped-entities
                <li key={sub.id}>Author's Id: {sub.authorId}
                  <span>
                    <Button variant="danger" onClick={() => handleDelete(sub.id)}>Unsubscribe</Button>
                  </span>
                </li>
              ))
            ) : (
              <li>You have not subscribed to anyone.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
