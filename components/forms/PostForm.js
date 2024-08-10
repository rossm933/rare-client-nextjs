// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { Card } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import { createPost, editPost } from '../../utils/data/postsData';
// import { getTags } from '../../utils/data/tagsData';

// function PostForm({ post }) {
//   const [tags, setTags] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]);
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     publication_Date: null,
//     category_Id: 0,
//     title: '',
//     content: '',
//     image_Url: '',
//     approved: false,
//     tags: [],
//   });

//   const toggleTag = (option) => {
//     if (selectedTags.includes(option)) {
//       setSelectedTags(
//         selectedTags.filter((item) => item !== option),
//       );
//     } else {
//       setSelectedTags(
//         [...selectedTags, option],
//       );
//     }
//   };

//   useEffect(() => {
//     getTags().then(setTags);
//     if (post?.id) {
//       setFormData(post);
//     }
//   }, [post]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (post?.id) {
//       const payload = {
//         ...formData,
//         tags: selectedTags,
//       };
//       editPost(payload).then(() => router.push('/posts'));
//     } else {
//       const payload = {
//         ...formData,
//         publication_Date: new Date(),
//         tags: selectedTags,
//       };
//       createPost(payload).then(() => (router.push('/posts')));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <Card className="p-2 flex flex-col my-5 mx-auto w-[40%] bg-inherit border-none">
//         <h1 className="font-semibold mb-4 fs-5">Write a Post</h1>
//         <Form
//           className="flex flex-col"
//           onSubmit={handleSubmit}
//         >
//           <Form.Group>
//             <Form.Label className="sm:text-sm sm:leading-6 mb-0">Title</Form.Label>
//             <Form.Control
//               type="text"
//               className="input rounded-none mb-3 sm:text-sm sm:leading-6"
//               placeholder="Enter title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label className="sm:text-sm sm:leading-6 mb-0">Content</Form.Label>
//             <Form.Control
//               type="text"
//               as="textarea"
//               className="input rounded-none sm:text-sm sm:leading-6 mb-3"
//               placeholder="Write your post"
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label className="sm:text-sm sm:leading-6 mb-0">Image</Form.Label>
//             <Form.Control
//               type="url"
//               className="input rounded-none mb-3 sm:text-sm sm:leading-6"
//               placeholder="Enter image URL"
//               name="image_Url"
//               value={formData.image_Url}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label className="sm:text-sm sm:leading-6 mb-0">Approved?</Form.Label>
//             <Form.Control
//               type="text"
//               className="input rounded-none mb-3 sm:text-sm sm:leading-6"
//               placeholder="Yes or No"
//               name="approved"
//               value={formData.approved}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <div
//             className="flex flex-row justify-start"
//           >
//             {tags.map((t) => (
//               <>
//                 <div className="flex flex-row items-center my-2">
//                   <Form.Check
//                     className="mr-1 border-slate-500 d-inline-block"
//                     key={t.id}
//                     onClick={() => toggleTag(t)}
//                   />
//                 </div>
//               </>
//             ))}
//           </div>
//         </Form>
//         <Button className="bg-slate-800 border-none hover:bg-slate-800 text-white font-semibold rounded-sm mt-1 w-24 py-1" type="submit">
//           Publish
//         </Button>
//       </Card>
//     </>
//   );
// }

// PostForm.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.number,
//     publication_Date: PropTypes.instanceOf(Date),
//     title: PropTypes.string,
//     content: PropTypes.string,
//     image_Url: PropTypes.string,
//     approved: PropTypes.bool,
//     tags: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number,
//       label: PropTypes.string,
//     })),
//   }).isRequired,
// };

// export default PostForm;
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
    getPosts().then(setPostData);

    if (post.id) setPostData(post);
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
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
        const patchPayload = { firebaseKey: name };
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

      <div>
        <b>Tags: </b>
        {tags.map((tag) => (
          <label key={tag.id}>
            <input type="checkbox" value={tag.id} onChange={handleChange} checked={postData.tagIds.includes(tag.id)} />
            {tag.label}
          </label>
        ))}
      </div>

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
    tags: PropTypes.arrayOf(PropTypes.string),
    category_Id: PropTypes.number,
    id: PropTypes.number,

  }),
};

PostForm.defaultProps = {
  post: initialState,
};
export default PostForm;
