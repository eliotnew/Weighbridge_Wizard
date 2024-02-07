import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@mui/material";
function LoadingContent() {
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
export default LoadingContent;
