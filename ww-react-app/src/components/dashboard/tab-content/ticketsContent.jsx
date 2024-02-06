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
import getAllTickets from "../../../functions/ticket_functions/getAllTickets";

function TicketsContent() {
  const theme = useTheme();
  const [tickets, setTickets] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTickets();
        //Displays different page content if it is empty

        if (fetchedTickets.length === 0) {
          setIsEmpty(true);
        } else {
          setTickets(fetchedTickets);
          setIsEmpty(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsEmpty(true); // Set to true if a 404 error is returned from the API
        } else {
          console.error("Failed to fetch tickets:", error);
        }
      }
    };

    fetchTickets();
  }, []); // Dependency array is empty, so this effect runs once on mount

  return (
    <>
      <Typography variant="h3"> Truck Database </Typography>
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
  );
}
export default TicketsContent;
