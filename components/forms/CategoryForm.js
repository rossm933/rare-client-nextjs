import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createCategory, getCategories } from '../../utils/data/categoriesData';

const initialState = {
  label: '',
};

export default function CategoryForm() {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (e) => {
    console.warn('input'); // getting input but not displaying on form
    const { id, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput };
    createCategory(payload).then(() => {
      router.push('/categories');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create Category</h2>

      {/* TITLE INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Category Label" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Category Label"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
