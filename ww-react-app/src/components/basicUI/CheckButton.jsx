import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function CheckButton({ onClick }) {
  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={onClick}
        sx={{ mt: 3, mb: 2 }}
      >
        Check Reg
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ marginLeft: "5px" }}
        />
      </Button>
    </>
  );
}
export default CheckButton;
