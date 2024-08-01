import React, { useState } from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppDispatch } from "../../store";
import { setActiveStep, uploadFile } from "../../store/user";
import ShowSnackbar from "../../utils";

const UploadExcelFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      (file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setSelectedFile(file);
    } else {
      ShowSnackbar.warning(`Please upload a valid Excel file (.xls or .xlsx)`);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    (await dispatch(uploadFile(formData))) as any;
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Upload Excel File
        </Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ mb: 2 }}
        >
          Upload File
          <input
            type="file"
            accept=".xls, .xlsx"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {selectedFile && (
          <Box mt={2} justifyContent="center" alignItems="center">
            <Typography variant="body1" textAlign="center">
              Selected File: {selectedFile.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
              sx={{ mt: 2, minWidth: 200 }}
            >
              Submit
            </Button>
          </Box>
        )}
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        <Button
          onClick={() => dispatch(setActiveStep(3))}
          variant="contained"
          color="primary"
          type="submit"
        >
          Reset
        </Button>
      </Box>
    </>
  );
};

export default UploadExcelFile;
