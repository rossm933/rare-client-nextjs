import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostForm from '../../../components/forms/PostForm';
import { getSinglePost } from '../../../utils/data/postsData';

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    if (id) {
      getSinglePost(id).then(setEditItem);
    }
  }, [id]);

  return (
    <PostForm post={editItem} />
  );
}
