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
import LoadingContent from "../../basicUI/LoadingContent";
import deleteTruck from "../../../functions/truck_functions/deleteTruck";

function TruckDatabaseContent() {
  const theme = useTheme();
  const [trucks, setTrucks] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  const fetchTrucks = async () => {
    try {
      const fetchedTrucks = await getAllTrucks();

      if (fetchedTrucks.length === 0) {
        setIsEmpty(true);
      } else {
        setTrucks(fetchedTrucks);
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

  useEffect(() => {
    fetchTrucks();
  }, []);

  const handleEdit = async (reg) => {
    window.alert(
      "Edit Not implemented yet. Delete and then create a new one in the meantime!"
    );
  };

  const handleDelete = async (reg) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to DELETE the truck with reg: " + reg + " ?"
    );

    if (isConfirmed) {
      try {
        const result = await deleteTruck(reg);
        if (result.success) {
          console.log("Truck deleted successfully.");
          fetchTrucks();
        } else {
          console.error("Failed to delete truck:", result.error);
          window.alert("Failed to delete truck!");
        }
      } catch (error) {
        console.error("Error deleting truck:", error);
        window.alert("Failed to delete truck!");
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
                        onClick={() => handleEdit(row.reg)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          backgroundColor: theme.palette.accent.scary,
                          color: theme.palette.accent.scaryContrastText,
                        }}
                        onClick={() => handleDelete(row.reg)}
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
