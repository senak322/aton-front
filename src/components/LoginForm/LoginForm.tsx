import React from "react";
import { useSelector } from "react-redux";
import { AuthState, loginUser } from "../../features/auth/authSlice";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";

type LoginPayload = {
  login: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string().required("Login is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values: LoginPayload) => {
      dispatch(loginUser(values));
    },
  });

  return (
    
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        {/* <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography> */}
        <TextField
          fullWidth
          margin="normal"
          id="login"
          name="login"
          label="Login"
          value={formik.values.login}
          onChange={formik.handleChange}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    
  );
};

export default LoginForm;
