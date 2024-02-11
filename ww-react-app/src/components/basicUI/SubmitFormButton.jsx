import Button from "@mui/material/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
function SubmitFormButton({ onClick }) {
  return (
    <>
      <Button
        type="submit"
        fullWidth
        onClick={onClick}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
        <FontAwesomeIcon icon={faPaperPlane} style={{ marginLeft: "5px" }} />
      </Button>
    </>
  );
}
export default SubmitFormButton;
