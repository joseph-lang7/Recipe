import { Form } from "./components/form/form";
import { useState } from "react";
import axios from "axios";
export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = formData;
      const res = await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      if (res.status === 200) {
        setFormData({
          username: "",
          password: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      usernameValue={formData.username}
      passwordValue={formData.password}
      label="Register"
    />
  );
};
