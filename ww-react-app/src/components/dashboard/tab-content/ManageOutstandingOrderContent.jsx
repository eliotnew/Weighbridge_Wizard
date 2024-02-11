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
import LoadingContent from "../../basicUI/LoadingContent";

function ManageOutstandingOrderContent() {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  const informUser = (event) => {
    window.alert(
      "This Functionality wasn't implemented, as it is not required for proof of concept."
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const openOrders = await getOpenOrders();

        if (openOrders.length === 0) {
          setIsEmpty(true);
        } else {
          setOrders(openOrders);
          setIsEmpty(false);
          setIsError(false);

          setIsLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsEmpty(true);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch all orders:", error);
          setIsError(true);
          setIsLoading(false);
        }
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <LoadingContent />;
  }

  return (
    <>
      <Typography variant="h3"> Manage Outstanding Orders </Typography>
      {isEmpty === true ? (
        <div>There are no Orders on the system yet.</div>
      ) : null}
      {isError === true ? (
        <div>
          Something went wrong fetching Open Orders from the server. Please
          contact the administrator.
        </div>
      ) : null}
      {isEmpty === false && isError === false ? (
        <>
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
                    Date Start
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
                    Quantity Requested
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Quantity Received
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Quantity Remaining
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
                    Truck Required
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Alter Requested Quantity
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ ...cellStyle }}>
                      {row.orderNumber}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.company}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.dateStart}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.product}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>
                      {row.quantity + " kg"}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle }}>
                      {row.amountDelivered + " kg"}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle }}>
                      {row.quantity - row.amountDelivered + " kg"}
                    </TableCell>

                    <TableCell sx={{ ...cellStyle }}>
                      <CircleProgressBar
                        value={(row.amountDelivered / row.quantity) * 100}
                        size={90} // Adjust size to be larger
                        strokeWidth={50} // Make the progress stroke wider
                      />
                    </TableCell>
                    <TableCell sx={{ ...cellStyle }}>
                      {row.truckRequired}
                    </TableCell>

                    <TableCell>
                      <Button
                        sx={{
                          backgroundColor: theme.palette.accent.main,
                          color: "black",
                        }}
                        onClick={() => informUser()}
                      >
                        +/-
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </>
  );
}
export default ManageOutstandingOrderContent;
