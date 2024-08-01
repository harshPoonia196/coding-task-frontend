import {
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store";
import { setActiveStep, setUserData } from "../../store/user";

// Form validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const UserDetailsForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.user);

  const onSubmit = (v: FormikValues) => {
    dispatch(setUserData(v));
    dispatch(setActiveStep(1));
  };

  const formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid style={{ width: "100%", maxWidth: 600, padding: 20 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Add details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        <Button disabled>Back</Button>
        <Button variant="contained" color="primary" type="submit">
          Next
        </Button>
      </Box>
    </form>
  );
};

export default UserDetailsForm;
