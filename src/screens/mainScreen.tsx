import React from "react";
import { Stepper, Step, StepLabel, Box, Grid, Card } from "@mui/material";
import UserDetailsForm from "../components/userDetailsForm";
import AddressForm from "../components/address";
import UserDetailsView from "../components/userDetailsView";
import UploadExcelFile from "../components/uploadFile";
import { useAppSelector } from "../store";

type StepComponent = () => JSX.Element;
const stepComponents: { [key: number]: StepComponent } = {
  0: UserDetailsForm,
  1: AddressForm,
  2: UserDetailsView,
  3: UploadExcelFile,
};

const MainScreen: React.FC = () => {
  const { activeStep } = useAppSelector((s) => s.user);

  const steps = [
    "Add details",
    "Add address details",
    "User details",
    "Upload file",
  ];

  const Comp = stepComponents[activeStep];

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Card sx={{ width: "100%", padding: 4, maxWidth: 800 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid>
          <Box style={{ padding: 20 }}>
            <Comp />
          </Box>
        </Grid>
      </Card>
    </Grid>
  );
};

export default MainScreen;
