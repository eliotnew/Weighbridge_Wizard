import React, { useState } from "react";
import BasicWebcam from "../../camera/BasicWebcam";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import SubmitFormButton from "../../basicUI/SubmitFormButton";

function IncomingContent() {
  const [job, setJob] = useState("none"); // I will go back and make it do a server query to check available jobs.
  const [product, setProduct] = useState("Example Product");
  const jobOptions = ["under construction", "asks server"];

  const handleChange = (event) => {
    setJob(event.target.value);
  };
  return (
    <>
      <Typography variant="h3"> Weigh In </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <BasicWebcam />
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            name="registration"
            label="Enter Reg:"
            variant="outlined"
            id="registration"
            autoComplete=""
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="tare"
            label="Enter Tare Weight (kg)"
            variant="outlined"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="select-job">Assign Job</InputLabel>
            <Select
              labelId="job-select-label"
              id="job-select"
              value={job}
              label="Assign Job"
              onChange={handleChange}
            >
              {jobOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {job !== "none" && (
            <TextField
              margin="normal"
              fullWidth
              id="product"
              value={product}
              label="Product to be Loaded:"
              variant="outlined"
              disabled="true"
            />
          )}
          <SubmitFormButton />
        </div>
      </div>
    </>
  );
}
export default IncomingContent;
