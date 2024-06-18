import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AuthState, loginUser } from "../../features/auth/authSlice";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/useAppDispatch";

type LoginPayload = {
  login: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ login, password } as LoginPayload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Login</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        Login
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
