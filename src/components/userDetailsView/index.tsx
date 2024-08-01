import {
  CardContent,
  Typography,
  Grid,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import { createUser, resetUserData, setActiveStep } from "../../store/user";
import ShowSnackbar from "../../utils";

const UserDetailsView = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((s) => s.user);

  const handleNext = async () => {
    const { payload } = (await dispatch(createUser(user))) as any;
    if (!payload.error) {
      ShowSnackbar.success("User created successfully");
      dispatch(setActiveStep(3));
      dispatch(resetUserData());
    }
  };

  const {
    firstName,
    lastName,
    phone,
    email,
    addressLine1,
    addressLine2 = "N/A",
    city,
    state,
    country,
    postalCode,
  } = user;
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "90vh" }}
      >
        <Grid
          style={{
            width: "100%",
            maxWidth: 600,
            padding: 20,
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              User Details
            </Typography>
            <Divider style={{ marginBottom: 20 }} />
            <Grid container spacing={2}>
              {/* Personal Details */}
              <Grid item xs={12}>
                <Typography variant="h6">Personal Information</Typography>
                <Typography variant="body1">
                  <strong>First Name:</strong> {firstName}
                </Typography>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {email}
                </Typography>
              </Grid>
              <Divider style={{ margin: "20px 0", width: "100%" }} />

              {/* Address Details */}
              <Grid item xs={12}>
                <Typography variant="h6">Address Information</Typography>
                <Typography variant="body1">
                  <strong>Address Line 1:</strong> {addressLine1}
                </Typography>
                <Typography variant="body1">
                  <strong>Address Line 2:</strong> {addressLine2}
                </Typography>
                <Typography variant="body1">
                  <strong>City:</strong> {city}
                </Typography>
                <Typography variant="body1">
                  <strong>State:</strong> {state}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {country}
                </Typography>
                <Typography variant="body1">
                  <strong>Postal Code:</strong> {postalCode}
                </Typography>
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
        <Button onClick={() => dispatch(setActiveStep(1))}>Back</Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </>
  );
};

export default UserDetailsView;
