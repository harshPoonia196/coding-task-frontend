import React, { useState } from "react";
import {
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Autocomplete,
} from "@mui/material";
import { useFormik, FormikValues } from "formik";
import * as Yup from "yup";
import { ICommonProps } from "../../screens/mainScreen";
import { useAppDispatch } from "../../store";
import { setUserData } from "../../store/user";
import { searchLocation } from "../../services/user";

// Define the shape of the form values
interface AddressFormValues {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

const initialValues: AddressFormValues = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
};

const validationSchema = Yup.object({
  addressLine1: Yup.string().required("Address Line 1 is required"),
  addressLine2: Yup.string().required("Address Line 2 is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string()
    .required("Postal Code is required")
    .matches(/^[0-9]{5,6}$/, "Postal Code must be 5 or 6 digits"),
});

const AddressForm = (props: ICommonProps) => {
  const { setActiveStep } = props;
  const dispatch = useAppDispatch();

  const onSubmit = (values: FormikValues) => {
    dispatch(setUserData(values));
    setActiveStep(2);
  };

  const formik = useFormik<AddressFormValues>({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const [addressOptions, setAddressOptions] = useState<string[]>([]);

  const handleAddressChange = async (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    if (value) {
      try {
        const response = await searchLocation(value);
        setAddressOptions(response.map((item: any) => item.display_name));
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    } else {
      setAddressOptions([]);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          style={{
            width: "100%",
            maxWidth: 600,
            padding: 20,
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Add address details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  freeSolo
                  onSelect={() => setAddressOptions([])}
                  options={addressOptions}
                  onInputChange={handleAddressChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      id="addressLine1"
                      name="addressLine1"
                      label="Address Line 1"
                      variant="outlined"
                      value={formik.values.addressLine1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.addressLine1 &&
                        Boolean(formik.errors.addressLine1)
                      }
                      helperText={
                        formik.touched.addressLine1 &&
                        formik.errors.addressLine1
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="addressLine2"
                  name="addressLine2"
                  label="Address Line 2"
                  variant="outlined"
                  value={formik.values.addressLine2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.addressLine2 &&
                    Boolean(formik.errors.addressLine2)
                  }
                  helperText={
                    formik.touched.addressLine2 && formik.errors.addressLine2
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  freeSolo
                  options={addressOptions}
                  onSelect={() => setAddressOptions([])}
                  onInputChange={handleAddressChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      id="city"
                      name="city"
                      label="City"
                      variant="outlined"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  freeSolo
                  options={addressOptions}
                  onSelect={() => setAddressOptions([])}
                  onInputChange={handleAddressChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      id="state"
                      name="state"
                      label="State"
                      variant="outlined"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.state && Boolean(formik.errors.state)
                      }
                      helperText={formik.touched.state && formik.errors.state}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  freeSolo
                  options={addressOptions}
                  onSelect={() => setAddressOptions([])}
                  onInputChange={handleAddressChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      id="country"
                      name="country"
                      label="Country"
                      variant="outlined"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.country && Boolean(formik.errors.country)
                      }
                      helperText={
                        formik.touched.country && formik.errors.country
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  variant="outlined"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.postalCode &&
                    Boolean(formik.errors.postalCode)
                  }
                  helperText={
                    formik.touched.postalCode && formik.errors.postalCode
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button onClick={() => setActiveStep(0)}>Back</Button>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Box>
      </form>
    </Grid>
  );
};

export default AddressForm;
