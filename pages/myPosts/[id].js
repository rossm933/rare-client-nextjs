// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { Button, FloatingLabel, Form } from 'react-bootstrap';
// import { getSinglePostWithTags } from '../../utils/data/postsData';

// export default function New() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [formInput, setFormInput] = useState({});

//   useEffect(() => {
//     getSinglePostWithTags(id).then(setFormInput);
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target; // name will be the input field, and value the current value
//     setFormInput((prevState) => ({ // prevState stores current data
//       ...prevState,
//       [name]: value, // when e.target target's a name/value in ...prevState those values are changed
//     }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   //createTag(tagData)
//   //     .then(() => {
//   //       router.push('/myPosts');
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error creating service ticket:', error);
//   //     });
//   // };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <h2 className="text-white mt-5">Create Tag</h2>

//       <FloatingLabel controlId="floatingInput1" label="Tag Label" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Title..."
//           name="Title"
//           value={formInput.title}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingInput1" label="Tag Label" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Enter image url"
//           name="imageUrl"
//           value={formInput.imageUrl}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingInput1" label="Tag Label" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Enter Content"
//           name="content"
//           value={formInput.content}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingInput1" label="Tag Label" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Enter image url"
//           name="imageUrl"
//           value={formInput.imageUrl}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <Button id="submit-ticket" type="submit">Submit Tag Label</Button>

//       <Button id="cancel-tag" type="button" onClick={handleCancel}>Cancel New Tag</Button>
//     </Form>
//   );
// }
