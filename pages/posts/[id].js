import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePostWithTags } from '../../utils/data/postsData';

export default function ViewPostDetails() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSinglePostWithTags(id).then(setPostDetails);
  }, [id]);

  return (
    <div
      className="mt-5 d-flex flex-wrap"
    >
      <div className="text-black ms-5 details">
        <h5>
          Title: {postDetails.title}
        </h5>
        <p> Content {postDetails.content}</p>
        <hr />
        <p>
          User: {postDetails.userId }
        </p>
        <p> Tags: {postDetails.tags.label}</p>
      </div>
    </div>
  );
}
