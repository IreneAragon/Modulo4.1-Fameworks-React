import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleNavigation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "admin" && password === "test") {
      navigate("/list");
    } else {
      alert("User / password not valid, psst... admin / test");
    }
  };

  return (
      <div className="form">
        <form onSubmit={handleNavigation} className="form__container">
          <h2 className="form__text--headline">Login to start using the app</h2>

          <div className="form__login">
            <div className="form__login--input-container">
              <label className="form__text--label">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form__login--input-container">
              <label className="form__text--label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="form__login--button">Login</button>
        </form>
      </div>
  );
};
