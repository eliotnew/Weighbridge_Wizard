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
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
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
  const informUser = (event) => {
    window.alert("Woosh! Re-sent the ticket to the driver and the customer.");
  };

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const fetchedTickets = await getAllTickets();
        setIsLoading(false);
        if (fetchedTickets && fetchedTickets.length > 0) {
          setTickets(fetchedTickets);
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
        setIsError(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTickets();
  }, []);
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
                    Driver Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Date Loaded
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
                    Weigh-Out Time
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Net-Weight
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Resend Paperless Ticket
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ ...cellStyle }}>{row.order_Id}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.reg}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>
                      {row.driverName}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.date}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.product}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>
                      {row.loadedLocation}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.timeOut}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.netWeight}</TableCell>

                    <TableCell sx={{ ...cellStyle }}>
                      <Button
                        fullWidth
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        }}
                        onClick={() => informUser()}
                      >
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{ marginLeft: "5px" }}
                        />
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
export default TicketsContent;
