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
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import getAllTickets from "../../../functions/ticket_functions/getAllTickets";
import LoadingContent from "../../basicUI/LoadingContent";

function TicketsContent() {
  const theme = useTheme();
  const [tickets, setTickets] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  const informUser = () => {
    window.alert("Whoosh! Re-sent the ticket to the driver and the customer.");
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

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
    }
    return faSort;
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "ascending") {
      if (aValue === undefined || aValue === null) return -1;
      if (bValue === undefined || bValue === null) return 1;
      return aValue.localeCompare(bValue);
    } else {
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;
      return bValue.localeCompare(aValue);
    }
  });

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
            <Table style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => requestSort("order_Id")}
                    >
                      <FontAwesomeIcon icon={getSortIcon("order_Id")} />
                    </IconButton>
                    Order ID
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    <IconButton size="small" onClick={() => requestSort("reg")}>
                      <FontAwesomeIcon icon={getSortIcon("reg")} />
                    </IconButton>
                    Reg Plate
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => requestSort("driverName")}
                    >
                      <FontAwesomeIcon icon={getSortIcon("driverName")} />
                    </IconButton>
                    Driver Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => requestSort("dateLoaded")}
                    >
                      <FontAwesomeIcon icon={getSortIcon("dateLoaded")} />
                    </IconButton>
                    Date Loaded
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => requestSort("product")}
                    >
                      <FontAwesomeIcon icon={getSortIcon("product")} />
                    </IconButton>
                    Product
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => requestSort("loadedLocation")}
                    >
                      <FontAwesomeIcon icon={getSortIcon("loadedLocation")} />
                    </IconButton>
                    Loaded At
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => requestSort("inTime")}
                    >
                      <FontAwesomeIcon icon={getSortIcon("inTime")} />
                    </IconButton>
                    Weigh-In Time
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => requestSort("outTime")}
                    >
                      <FontAwesomeIcon icon={getSortIcon("outTime")} />
                    </IconButton>
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
                {sortedTickets.map((row, index) => (
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
                    <TableCell sx={{ ...cellStyle }}>{row.timeIn}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.timeOut}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.netWeight}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>
                      <Button
                        fullWidth
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        }}
                        onClick={informUser}
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
