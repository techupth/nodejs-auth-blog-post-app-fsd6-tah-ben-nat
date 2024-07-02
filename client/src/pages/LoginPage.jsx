import { useState } from "react";
import { useAuth } from "../contexts/authentication";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 🐨 Todo: Exercise #4
    //  นำ Function `login` ใน AuthContext มา Execute ใน Event Handler ตรงนี้
    login({ username, password });
  };

  return (
    <div className="login-form-container">
      <div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login Page</h1>
          <div className="input-container">
            <label>
              Username
              <input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                value={username}
              />
            </label>
          </div>
          <div className="input-container">
            <label>
              Password
              <input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <div>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
