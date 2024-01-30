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

function ViewClosedOrdersContent() {
  const theme = useTheme();
  const data = [
    {
      orderNumber: "1234567",
      company: "Construction LTD.",
      dateOpened: "07/12/2023",
      dateClosed: "06/01/2024",
      productType: "Clay Pellets",
      delivered: "44012",
    },
    {
      orderNumber: "1567895",
      company: "Argricultural & Co.",
      dateOpened: "21/12/2023",
      dateClosed: "06/01/2024",
      productType: "40mm Limestone",
      delivered: "3712",
    },
  ];

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  return (
    <>
      <Typography variant="h3"> View Closed Orders </Typography>
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
                Date Opened
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Date Closed
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
                Quantity Delivered
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                View Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ ...cellStyle }}>{row.orderNumber}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.company}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.dateOpened}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.dateClosed}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.productType}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.delivered}</TableCell>

                <TableCell>
                  <Button
                    sx={{
                      backgroundColor: theme.palette.accent.main,
                      color: "black",
                    }}
                    onClick={() => handleCancel(Reg)}
                  >
                    View
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
export default ViewClosedOrdersContent;
