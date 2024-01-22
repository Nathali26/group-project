import { useState } from "react";
import axios from "axios"; // axios is a library , cleaner and simpler to the fetch  */

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState(null);

  const { username, password } = credentials;  /* Destructuring assignment */

  const handleChange = (e) => {
    const { name, value } = e.target; /*  e.target represents the DOM element that triggered the event (for example, an input field). */
    setCredentials({ ...credentials, [name]: value });  /* name represents the name attribute, value represents the value that the user has entered. lines 46 & 48 */
  };

  const register = async () => {
    try {
      const { response} = await axios("/api/auth/register", {
        method: "POST",
        data: credentials,  // with fetch we have the json that we need to stringify etc, here we just have the data , and the rest is under the hood
      });
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    } return "Welcome!";
  };


  return (
    <div>
      <div>
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-primary" onClick={register}>
            Register
          </button>
        </div>
      </div>
      

      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
  );
}

export default Register;