import React from "react";
import { useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { RootState } from "../../store/store";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      login: Yup.string().required("Login is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values: {
      fullName: string;
      login: string;
      password: string;
    }) => {
      try {
        const data = await dispatch(registerUser(values));
        if (data) {
          navigate("/");
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
      {/* <Typography variant="h5" component="h1" gutterBottom>
        Register
      </Typography> */}
      <TextField
        fullWidth
        margin="normal"
        id="fullName"
        name="fullName"
        label="Full Name"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        helperText={formik.touched.fullName && formik.errors.fullName}
      />
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
        Зарегистрироваться
      </Button>
      <Link to="/login">Login</Link>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default RegisterForm;
