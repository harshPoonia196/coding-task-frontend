import React, { useState } from "react";
import { Stepper, Step, StepLabel, Box, Grid, Card } from "@mui/material";
import UserDetailsForm from "../components/userDetailsForm";
import AddressForm from "../components/address";
import UserDetailsView from "../components/userDetailsView";
import UploadExcelFile from "../components/uploadFile";

type StepComponent = (props: ICommonProps) => JSX.Element;
const stepComponents: { [key: number]: StepComponent } = {
  0: UserDetailsForm,
  1: AddressForm,
  2: UserDetailsView,
  3: UploadExcelFile,
};

export interface ICommonProps {
  setActiveStep: (v: number) => void;
  activeStep: number;
}

const MainScreen: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

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
            <Comp activeStep={activeStep} setActiveStep={setActiveStep} />
          </Box>
        </Grid>
      </Card>
    </Grid>
  );
};

export default MainScreen;
