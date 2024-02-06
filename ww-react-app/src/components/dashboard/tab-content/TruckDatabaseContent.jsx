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

function TruckDatabaseContent() {
  const theme = useTheme();
  const [trucks, setTrucks] = useState([]);

  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  };

  useEffect(() => {
    const fetchTrucks = async () => {
      const fetchedTrucks = await getAllTrucks();
      setTrucks(fetchedTrucks);
    };

    fetchTrucks();
  }, []);

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
                <TableCell sx={{ ...cellStyle }}>{row.driverName}</TableCell>
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
  );
}
export default TruckDatabaseContent;
