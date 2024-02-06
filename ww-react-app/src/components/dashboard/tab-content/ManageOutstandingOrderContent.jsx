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
import CircleProgressBar from "../../basicUI/CircleProgressBar";
import getOpenOrders from "../../../functions/order_functions/getOpenOrders";

function ManageOutstandingOrderContent() {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const openOrders = await getOpenOrders();
      setOrders(openOrders);
    };

    fetchOrders();
  }, []);

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
                Remaining
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Order Progress
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                View/Edit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ ...cellStyle }}>{row.orderNumber}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.company}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.dateStart}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.product}</TableCell>
                <TableCell sx={{ ...cellStyle }}>
                  {row.quantity - row.amountDelivered + " kg"}
                </TableCell>
                <TableCell sx={{ ...cellStyle }}>
                  <CircleProgressBar
                    value={(row.amountDelivered / row.quantity) * 100}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    sx={{
                      backgroundColor: theme.palette.accent.main,
                      color: "black",
                    }}
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
