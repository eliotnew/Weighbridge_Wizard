import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
  Modal,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MeAndTruck from "../../img_Assets/MeAndTruck.png";
import docker from "../../img_Assets/stack/docker.webp";
import javascript from "../../img_Assets/stack/javascript.png";
import mongo from "../../img_Assets/stack/mongo.png";
import python from "../../img_Assets/stack/python.png";
import react from "../../img_Assets/stack/react.png";
import ultralytics from "../../img_Assets/stack/ultralytics.png";

function LPappbar() {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        <Link to="/" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon
            icon={faHatWizard}
            size="2xl"
            flip="horizontal"
            style={{
              color: theme.palette.text.primary,
            }}
          />
        </Link>
        <Link to="/" style={{ cursor: "pointer", textDecoration: "none" }}>
          <div>
            <Typography
              className="WizardFont"
              variant="h4"
              noWrap
              component="div"
              sx={{
                fontFamily: "sans-serif",
                paddingLeft: "10px",
                "&:hover": { transform: "scale(1.05)" },
                display: { xs: "none", sm: "block" },
                transition: "transform 0.35s",
              }}
              style={{
                fontFamily: "Bona Nova",
                color: theme.palette.primary.contrastText,
                fontWeight: 1000,
              }}
            >
              WeighBridge Wizard
            </Typography>
          </div>
        </Link>

        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, paddingLeft: "12px" }}
        ></Typography>
        <Button
          onClick={handleOpenModal}
          sx={{
            color: theme.palette.primary.contrastText,
            fontWeight: 1000,
            "&:hover": {
              backgroundColor: theme.palette.primary.contrastText,
              color: theme.palette.primary.main,
              transform: "scale(1.1)",
              transition: "transform 0.35s",
            },
          }}
          color="inherit"
        >
          About
        </Button>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="about-modal"
          aria-describedby="about-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40vw",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="about-modal" variant="h4" component="h2">
              The WeighBridge Wizard
            </Typography>
            <Typography id="about-modal-description" sx={{ mt: 2 }}>
              This is my Final Year Project for my studies of "Computer Science
              (Software Engineering)" for the University of Plymouth. It is a
              culmination of most of the things that I have Learned In my
              studies, Combining HCI, Fullstack Dev, Testing, AI , Data, API and
              OOP.
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={MeAndTruck}
                alt="Me And Truck"
                style={{ width: "500px", height: "500px" }}
              />
            </div>
            <Typography id="about-modal-description" sx={{ mt: 2 }}>
              From my experience in Ports and Quarries, Operating machinery and
              Weighbridges, I Learned that Poorly designed software can create
              an unecessarily high skill requirement for what could be an
              amazing job if made more accessible.
            </Typography>
            <Typography
              id="about-modal-description"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              With Clean & responsive UI , AI assistance , an intuitive tab
              based workflow and abstraction of unecessary data, This project
              aims to deliver a model for making work better for everyone and
              anyone.
            </Typography>
            <Typography id="about-modal-description" sx={{ mt: 2 }}>
              Stack Used:
            </Typography>
            <Box></Box>
          </Box>
        </Modal>
        <Typography
          variant="h6"
          component="span"
          style={{
            margin: "0 8px",
            marginBottom: "5px",
            color: theme.palette.primary.contrastText,
            fontWeight: 1000,
          }}
        >
          |
        </Typography>
        <Link to="/signin">
          <Button
            sx={{
              color: theme.palette.primary.contrastText,
              fontWeight: 1000,
              "&:hover": {
                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,
                transform: "scale(1.1)",
                transition: "transform 0.35s",
              },
            }}
            color="inherit"
          >
            Sign In{" "}
            <FontAwesomeIcon
              icon={faRightToBracket}
              style={{ marginLeft: "6px" }}
            />
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
export default LPappbar;
