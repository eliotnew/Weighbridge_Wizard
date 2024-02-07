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
import getAllTrucks from "../../../functions/truck_functions/getAllTrucks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function TruckDatabaseContent() {
  const theme = useTheme();
  const [trucks, setTrucks] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const fetchedTrucks = await getAllTrucks();

        if (fetchedTrucks.length === 0) {
          setIsEmpty(true);
        } else {
          setTrucks(fetchedTrucks);
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

    fetchTrucks();
  }, []); // Dependency array is empty, so this effect runs once on mount

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography variant="h3" style={{ marginBottom: "20px" }}>
          Loading...
        </Typography>
        <FontAwesomeIcon icon={faSpinner} spin size="4x" />
      </div>
    );
  }

  return (
    <>
      <Typography variant="h3"> Truck Database </Typography>
      {isEmpty === true ? (
        <div>There are no Trucks on the system yet.</div>
      ) : null}
      {isError === true ? (
        <div>
          Something went wrong fetching Trucks from the server. Please contact
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
                    Reg Plate
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Truck Type
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Max GVW
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Driver
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Phone Contact
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    E-mail Address
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Edit
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trucks.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ ...cellStyle }}>{row.reg}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.truckType}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.maxGVW}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>
                      {row.driverName}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.phone}</TableCell>
                    <TableCell sx={{ ...cellStyle }}>{row.email}</TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          backgroundColor: theme.palette.accent.main,
                          color: "black",
                        }}
                        onClick={() => handleCancel(Reg)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          backgroundColor: "red",
                          color: "black",
                        }}
                        onClick={() => handleCancel(Reg)}
                      >
                        Delete
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
export default TruckDatabaseContent;
