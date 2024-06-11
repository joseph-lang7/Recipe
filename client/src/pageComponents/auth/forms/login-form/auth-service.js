import axios from "axios";
export const onSubmit = async (
  data,
  setInvalidCredentials,
  navigate,
  setCookies
) => {
  setInvalidCredentials(false);
  try {
    const { username, password } = data;
    const res = await axios.post(
      "https://recipe-jepg.onrender.com/auth/login",
      {
        username,
        password,
      }
    );
    if (res.status === 200) {
      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userID", res.data.userID);
      navigate("/");
    }
  } catch (error) {
    console.error(error);
    setInvalidCredentials(true);
  }
};
