import React, { useState, useEffect } from "react";
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
import getAllOnsite from "../../../functions/ticket_functions/getAllOnsite";
import LoadingContent from "../../basicUI/LoadingContent";
import cancelOnsite from "../../../functions/ticket_functions/cancelOnsite";
function ViewOnsiteContent() {
  const theme = useTheme();

  const [tickets, setTickets] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  useEffect(() => {
    const fetchOnsiteTickets = async () => {
      try {
        const fetchedTickets = await getAllOnsite();

        if (fetchedTickets.length === 0) {
          setIsEmpty(true);
        } else {
          setTickets(fetchedTickets);
          setIsLoading(false);
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

    fetchOnsiteTickets();
  });

  const handleCancel = async (reg) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel loading of " + reg + " ?"
    );

    if (isConfirmed) {
      try {
        const result = await cancelOnsite(reg);
        console.log("Cancel res:", result.response.status);
        fetchOnsiteTickets();
      } catch (error) {
        console.error("Error canceling onsite ticket:", error);
      }
    } else {
      return;
    }
  };

  if (isLoading) {
    return <LoadingContent />;
  }

  return (
    <>
      <Typography variant="h3"> View Onsite </Typography>
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
                Reg
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
                Product Loading
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Tare Weight (Kg)
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Arrival
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Cancel Loading
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ ...cellStyle }}>{row.reg}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.driverName}</TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.product}</TableCell>
                <TableCell sx={{ ...cellStyle }}>
                  {row.tareWeight + " Kg"}
                </TableCell>
                <TableCell sx={{ ...cellStyle }}>{row.timeIn}</TableCell>
                <TableCell>
                  <Button
                    sx={{ backgroundColor: "rosybrown", color: "black" }}
                    onClick={() => handleCancel(row.reg)}
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
