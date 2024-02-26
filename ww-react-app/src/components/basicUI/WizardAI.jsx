import { Button, Box, Typography } from "@mui/material/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
function WizardAI({ onClick, displayString }) {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5">
          <FontAwesomeIcon icon={faRobot} style={{ marginRight: "5px" }} />
          Wiz-AI detected:
        </Typography>

        <Box
          textAlign="center"
          sx={{
            marginX: "10px",
            marginY: "10px",
            bgcolor: "yellow",
            borderRadius: "10px",
            padding: "15px",
            border: "2px solid black",
            cursor: "pointer",
          }}
          onClick={onClick}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              color: "black",
            }}
          >
            SA63ETV {displayString}
            <FontAwesomeIcon
              beat
              icon={faArrowPointer}
              style={{ fontSize: "25px", animationDuration: "0.8s" }}
            />
          </Typography>
        </Box>
      </Box>
    </>
  );
}
export default WizardAI;
