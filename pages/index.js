import { useEffect, useState } from 'react';
import { getSingleUser } from '../utils/data/usersData';
// import { getSinglePost } from '../utils/data/postsData';

function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getSingleUser(1).then(setUser);
  }, []);

  return (
    <>
      <h3>{user.firstName} {user.lastName}</h3>
      <div>
        <image>{user.userImage}
          <>{console.warn(user)}</>
        </image>
        <span>{user.username}</span>
        <div>
          <span>{user.bio}</span>
        </div>
      </div>
    </>
  );
}

export default Home;
