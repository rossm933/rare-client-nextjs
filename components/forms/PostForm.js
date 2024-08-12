import React, { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createPost, editPost, getPosts } from '../../utils/data/postsData';
import { getTags } from '../../utils/data/tagsData';

const initialState = {
  publication_Date: null,
  category_Id: 0,
  title: '',
  content: '',
  image_Url: '',
  approved: false,
  tags: [],
};

function PostForm({ post }) {
  const router = useRouter();
  const [postData, setPostData] = useState({ initialState });
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags().then(setTags);
    console.warn(tags);
  }, []);

  useEffect(() => {
    getPosts().then(setPostData);

    if (post.id) setPostData(post);
  }, [post]);

  const handleChange = (e) => {
    const {
      name, value,
    } = e.target;
    // if (type === 'checkbox') {
    //   const currentTagIds = [...postData.tags];
    //   const tagId = parseInt(e.target.value, 10);
    //   if (checked) {
    //     currentTagIds.push(tagId);
    //   } else {
    //     const index = currentTagIds.indexOf(tagId);
    //     currentTagIds.splice(index, 1);
    //   }
    setPostData((prevState) => ({
      ...prevState,
      // tags: currentTagIds,
      [name]: name === 'approved' ? value === 'true' : value, // Convert to boolean
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.id) {
      editPost(postData).then(() => router.push(`/posts/edit/${post.id}`));
    } else {
      const payload = { ...postData, post: post.id };
      createPost(payload).then(({ name }) => {
        const patchPayload = { id: name };
        editPost(patchPayload).then(() => {
          router.push('/posts/posts');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{post.id ? 'Update' : 'Create'}</h2>

      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Title"
          name="title"
          value={postData.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Content" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Write here"
          name="content"
          value={postData.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Image URL"
          name="image_Url"
          value={postData.image_Url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Approved?" className="mb-3">
        <Form.Select
          name="approved"
          onChange={handleChange}
          value={postData.approved}
          required
        >
          <option value>Yes</option>
          <option value={false}>No</option>
        </Form.Select>
      </FloatingLabel>

      {/* <div>
        <b>Tags: </b>
        {tags.map((tag) => (
          <label key={tag.id}>
            <input
              type="checkbox"
              value={tag.id}
              onChange={handleChange}
              checked={postData.tagId.includes(tag.id)}
            />
            {tag.label}
          </label>
        ))}
      </div> */}

      <Button id="submit-ticket" type="submit">{post.id ? 'Update' : 'Create'}Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    image_Url: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.bool,
    // tags: PropTypes.arrayOf(PropTypes.string),
    category_Id: PropTypes.number,
    id: PropTypes.number,
    // tagId: PropTypes.number,

  }),
};

PostForm.defaultProps = {
  post: initialState,
};
export default PostForm;
