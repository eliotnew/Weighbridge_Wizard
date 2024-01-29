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
import CircleProgressBar from "../../basicUI/CircleProgressBar";

function ManageOutstandingOrderContent() {
  const theme = useTheme();
  const data = [
    {
      orderNumber: "1234567",
      company: "Construction LTD.",
      date: "07/12/2023",
      productType: "Clay Pellets",
      remaining: "44012",
      progress: "32",
    },
    {
      orderNumber: "1567895",
      company: "Argricultural & Co.",
      date: "21/12/2023",
      productType: "40mm Limestone",
      remaining: "3712",
      progress: "75",
    },
  ];

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  return (
    <>
      <Typography variant="h3"> Manage Outstanding Orders </Typography>
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
                Order Number
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Company
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Product Type
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Remainder Quantity
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                View/ Edit Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ ...cellStyle }}>{row.orderNumber}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.company}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.date}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.productType}</TableCell>
                <TableCell sx={{ ...cellStyle }}>
                  <CircleProgressBar value={row.progress} />
                </TableCell>

                <TableCell>
                  <Button
                    sx={{ backgroundColor: "warning", color: "black" }}
                    onClick={() => handleCancel(Reg)}
                  >
                    View/Edit
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
export default ManageOutstandingOrderContent;
