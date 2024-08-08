import React, { useState } from 'react';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createTag } from '../../utils/data/tagsData';

function TagForm() {
  const router = useRouter();
  const [tagData, setTagData] = useState({
    label: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTagData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTag(tagData)
      .then(() => {
        router.push('/tags');
      })
      .catch((error) => {
        console.error('Error creating service ticket:', error);
      });
  };

  const handleCancel = () => {
    router.push('/tags');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">Create Tag</h2>

      <FloatingLabel controlId="floatingInput1" label="Tag Label" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter tag label"
          name="label"
          value={tagData.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button id="submit-ticket" type="submit">Submit Tag Label</Button>

      <Button id="cancel-tag" type="button" onClick={handleCancel}>Cancel New Tag</Button>
    </Form>
  );
}
export default TagForm;
