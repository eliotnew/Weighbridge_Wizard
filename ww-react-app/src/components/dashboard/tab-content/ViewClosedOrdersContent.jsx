import React, { useEffect, useState } from "react";
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
import getClosedOrders from "../../../functions/order_functions/getClosedOrders";

function ViewClosedOrdersContent() {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const closedOrders = await getClosedOrders();
      setOrders(closedOrders);
    };

    fetchOrders();
  }, []);

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
            {orders.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ ...cellStyle }}>{row.orderNumber}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.company}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.dateStart}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.dateFinish}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.product}</TableCell>
                <TableCell sx={{ ...cellStyle }}>
                  {row.amountDelivered + " kg"}
                </TableCell>
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
