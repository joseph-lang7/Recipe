import { Form } from "./components/form/form";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [, setCookies] = useCookies(["access_token"]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = formData;
      const res = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      if (res.status === 200) {
        console.log(res);
        setCookies("access_token", res.data.token);
        window.localStorage.setItem("userID", res.data.userID);
        navigate("/");
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
      label="Login"
    />
  );
};
