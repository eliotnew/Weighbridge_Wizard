import { Box, Typography } from "@mui/material/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
function RegPlate({ onClick, reg }) {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" style={{ fontSize: "20px" }}>
          <FontAwesomeIcon icon={faRobot} style={{ marginRight: "5px" }} />
          Wiz-AI (Beta) detected:
        </Typography>

        <Box
          textAlign="center"
          sx={{
            marginX: "10px",
            marginY: "10px",
            bgcolor: "yellow",
            borderRadius: "10px",
            padding: "2px",
            border: "2px solid black",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.5,
              transform: "scale(1.05)",
              transition: "transform 0.1s",
            },
          }}
          onClick={onClick}
        >
          <Box sx={{ flexDirection: "Column" }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                color: "black",
                fontSize: "40px",
                textTransform: "uppercase",
              }}
            >
              {reg}
            </Typography>
            <Typography sx={{ fontSize: "15px", fontStyle: "italic" }}>
              {" "}
              Click To use
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default RegPlate;
