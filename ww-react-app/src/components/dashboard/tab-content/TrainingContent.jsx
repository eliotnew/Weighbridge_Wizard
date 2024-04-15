import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

function TrainingContent() {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="body">
                UK GOV Driver & Vehicle Standards Agency - Consolidated code of
                practice: enforcement weighing of vehicles
              </Typography>
            </TableCell>
            <TableCell>
              <Link to="https://www.gov.uk/government/publications/weighing-vehicles-for-enforcement-consolidated-code-of-practice/consolidated-code-of-practice-enforcement-weighing-of-vehicles">
                Link
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body">
                Rhondda Cynon Taf County Borough Council - Weighbridge Operator
                Licence Guidance Notes
              </Typography>
            </TableCell>
            <TableCell>
              <Link to="https://www.rctcbc.gov.uk/EN/Business/LicencesandPermits/Otherlicences/Weighbridgeoperatorslicence/WeighbridgeOperatorLicenceGuidanceNotes.aspx">
                Link
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body">
                Weights and Measures Act 1985 - legislation.gov.uk
              </Typography>
            </TableCell>
            <TableCell>
              <Link to="https://www.legislation.gov.uk/ukpga/1985/72/pdfs/ukpga_19850072_en.pdf">
                Link
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body">
                Weights and Measures Act 1985 Chapter 72 PDF - Standards of
                Measurement and Weighing
              </Typography>
            </TableCell>
            <TableCell>
              <Link to="https://www.legislation.gov.uk/ukpga/1985/72/contents">
                Link
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body">
                The Measuring Instruments Regulations 2016
              </Typography>
            </TableCell>
            <TableCell>
              <Link to="https://www.legislation.gov.uk/uksi/2016/1153/part/1/made">
                Link
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TrainingContent;
