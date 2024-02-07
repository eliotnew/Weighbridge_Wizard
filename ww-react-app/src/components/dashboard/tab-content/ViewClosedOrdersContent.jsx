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
import LoadingContent from "../../basicUI/LoadingContent";

function ViewClosedOrdersContent() {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const closedOrders = await getClosedOrders();

        if (closedOrders.length === 0) {
          setIsEmpty(true);
        } else {
          setOrders(closedOrders);
          setIsEmpty(false);
          setIsError(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsEmpty(true);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch closed orders:", error);
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
      <Typography variant="h3"> View Closed Orders </Typography>
      {isEmpty === true ? (
        <div>There are no Orders on the system yet.</div>
      ) : null}
      {isError === true ? (
        <div>
          Something went wrong fetching Closed Orders from the server. Please
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
                    <TableCell sx={{ ...cellStyle }}>
                      {row.orderNumber}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.company}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.dateStart}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>
                      {row.dateFinish}
                    </TableCell>
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
      ) : null}
    </>
  );
}
export default ViewClosedOrdersContent;
