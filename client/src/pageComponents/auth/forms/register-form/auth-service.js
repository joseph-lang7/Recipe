import axios from "axios";

export const getUsernames = async () => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/users`);
  const users = res.data;
  const usernames = users.map((user) => user.username);
  return usernames;
};

export const onSubmit = async (data, navigate, setUsernameExists) => {
  const { username, password } = data;
  try {
    const existingUsernames = await getUsernames();
    if (existingUsernames.includes(username)) {
      setUsernameExists(true);
    } else {
      axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {
        username,
        password,
      });
      navigate("/auth/login");
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkUsernameExistence = async (username, setUsernameExists) => {
  try {
    const existingUsernames = await getUsernames();
    setUsernameExists(existingUsernames.includes(username));
  } catch (error) {
    console.error(error);
  }
};
