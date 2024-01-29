import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useTheme,
  Typography,
} from "@mui/material";
function ViewOnsiteContent() {
  const theme = useTheme();
  const data = [
    {
      reg: "WG14 AFT",
      name: "Rob Banks",
      contact: "077123983",
      productLoading: "Clay Pellets",
      arrival: "10:31AM",
    },
    {
      reg: "WG17 UMP",
      name: "Yvette F. Hertz",
      contact: "073424338",
      productLoading: "40mm Limestone",
      arrival: "10:35AM",
    },
  ];

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  return (
    <>
      <Typography variant="h3"> View Onsite </Typography>
      <TableContainer component={Paper}>
        <Table
          style={{
            width: "100%",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Reg
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Driver Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Phone Number
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Product Loading
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Arrival
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Cancel Loading
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ ...cellStyle }}>{row.reg}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.name}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.contact}</TableCell>
                <TableCell sx={{ ...cellStyle }}>
                  {row.productLoading}
                </TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.arrival}</TableCell>
                <TableCell>
                  <Button
                    sx={{ backgroundColor: "rosybrown", color: "black" }}
                    onClick={() => handleCancel(Reg)}
                  >
                    Cancel Loading
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default ViewOnsiteContent;
