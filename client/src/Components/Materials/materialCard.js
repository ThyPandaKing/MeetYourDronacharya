import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import dompurify from "dompurify";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import MenuList from "@mui/material/MenuList";
import axios from "axios";
import { confirm } from "react-confirm-box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();


const MaterialCard = ({ material }) => {
  const sanitizer = dompurify.sanitize;
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Confirm = async (userId, materialId) => {
    //const result = await confirm("Are you sure?");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/study-material/deleteMaterial`,
        {
          materialId,
        }
      )
      .then((res) => {
        window.location.reload();
      });
    return;
  };

  const [openconfirm, setOpenConfirm] = React.useState(false);

  const handleClickOpenconfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseconfirm = () => {
    setOpenConfirm(false);
  };

  const DeleteMat = (userId, experienceId) => {
    if (!user) {
      //alert("Please login to like this question");
      toast.error("Please login to like this question");
      return;
    }
    Confirm(userId, experienceId);
  };
  // For showing cards displaying studying material
  return (
    <div>
      <Card
        sx={{
          marginTop: "2%",
          padding: "1.5%",
          background: "#EAE6F8",
        }}
      >
        <CardContent sx={{ justify: "flex-end", float: "right" }}>
          {user && user._id === material.by ? (
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "short-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 3,
                    width: "12ch",
                  },
                }}
              >
                <MenuList>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        {
                          handleClickOpenconfirm();
                        }
                      }}
                      sx={{ color: "black" }}
                    >
                      Delete
                    </Button>
                    <Dialog
                      open={openconfirm}
                      onClick={() => {
                        {
                          handleClose();
                          handleCloseconfirm();
                        }
                      }}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure to delete?"}
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          onClick={() => {
                            {
                              handleCloseconfirm();
                            }
                            DeleteMat(user ? user._id : 0, material._id);
                          }}
                        >
                          Yes
                        </Button>
                        <Button onClick={handleCloseconfirm} autoFocus>
                          No
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <div />
          )}
        </CardContent>
        <Grid container>
          <Grid item sm={4} md={3}>
            <Link to={`/dashboard/${material.by}`}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    alt={`${material.userName}`}
                    src={`${material.userImage}`}
                  />
                }
                title={material.userName}
                subheader={material.date.split("T")[0]}
              />
            </Link>
            <div style={{ display: "inline-block" }}>
              <Button
                variant="outlined"
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "2% 5%" }}
              >
                View Material
              </Button>
              <Button variant="outlined" style={{ margin: "2% 5%" }}>
                Chat
              </Button>
            </div>
          </Grid>
          <Grid item sm={8} md={9}>
            <CardContent>
              <Typography variant="h4" color="text.primary">
                {material.topic}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="justify"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(material.description),
                  }}
                  style={{ padding: "1%", textAlign: "justify" }}
                />
              </Typography>
              <Typography variant="h7" color="text.primary">
                {material.location}
              </Typography>
            </CardContent>
            <div style={{ padding: "0.5%" }}>
              {material.tags.map((tag) => (
                <Typography display="inline" color="primary">
                  #{tag}{" "}
                </Typography>
              ))}
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default MaterialCard;
