import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Typography,
} from "@mui/material";
import getAllTickets from "../../../functions/ticket_functions/getAllTickets";
import LoadingContent from "../../basicUI/LoadingContent";
function TicketsContent() {
  const theme = useTheme();
  const [tickets, setTickets] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTickets();

        if (fetchedTickets.length === 0) {
          setIsEmpty(true);
        } else {
          setTickets(fetchedTickets);
          setIsEmpty(false);
          setIsError(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsEmpty(true);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch tickets:", error);
          setIsError(true);
          setIsLoading(false);
        }
      }
    };

    fetchTickets();
  }, []); // Dependency array is empty, so this effect runs once on mount

  if (isLoading) {
    return <LoadingContent />;
  }

  return (
    <>
      <Typography variant="h3"> View Tickets </Typography>
      {isEmpty === true ? (
        <div>There are no Tickets on the system yet.</div>
      ) : null}
      {isError === true ? (
        <div>
          Something went wrong fetching tickets from the server. Please contact
          the administrator.
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
                    Order ID
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Reg Plate
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
                    Product
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Loaded At
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Time Out
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ ...cellStyle }}>{row.order_Id}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.reg}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.date}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.product}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>
                      {row.loadedLocation}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.timeOut}</TableCell>
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
export default TicketsContent;
