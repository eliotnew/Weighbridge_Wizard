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
} from "@mui/material";

function ViewOnsiteContent() {
  const data = [
    {
      reg: "WG14 AFT",
      productLoading: "Clay",
      arrival: "10:31AM",
      cancel: "No",
    },
    {
      reg: "WG17 UMP",
      productLoading: "40mm Limestone",
      arrival: "10:35AM",
      cancel: "Yes",
    },
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          style={{
            width: "100%",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Reg</TableCell>
              <TableCell>Product Loading</TableCell>
              <TableCell>Arrival</TableCell>
              <TableCell>Cancel?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.reg}</TableCell>
                <TableCell>{row.productLoading}</TableCell>
                <TableCell>{row.arrival}</TableCell>
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
