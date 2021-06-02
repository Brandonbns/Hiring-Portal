import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import Menu from "@material-ui/core/Menu";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import TransferWithinAStationRoundedIcon from "@material-ui/icons/TransferWithinAStationRounded";

import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { log_out } from "../../globals";
import { connect } from "react-redux";

import Schedule from "./InterviewsComponents/Schedule";
import PendingInterviews from "./InterviewsComponents/PendingInterviews";
import InterviewsHome from "./InterviewsComponents/InterviewsHome";
import SortApplication from "./SortApplication/SortApplication";
import JobsRoot from "./Jobs/JobsRoot";
import UserCreation from "./UserCreation/UserCreation";
import DashboardContainer from "./Dashboard/DashboardContainer";
import { Button, Tooltip, Zoom } from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    color: "#FFF",
    backgroundColor: "#d93639",
    //backgroundImage:`url(${drawerbg})`,
    backgroundRepeat: "no-repeat",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    color: "#0009",
    backgroundColor: "#d93639",
    //backgroundImage:`url(${drawerbgcls})`,
    backgroundRepeat: "no-repeat",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(4) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    height: "100%",
    flexGrow: 1,
    //padding: theme.spacing(3),
  },
  logoutButton: {
    position: "fixed",
    right: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Appbar(props) {
  const [tab, setTab] = useState("");
  //const [logout, setLogout] = useState(false);
  const [interviewer, setInterviewer] = useState({
    isInterviewer: "",
    interviewer_id: "",
  });
  const [admin, setAdmin] = useState({ isAdmin: "", admin_id: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [footerClass, setFooterClass] = useState("footer-hide");

  useEffect(() => {
    async function setData() {
      console.log(props, "in app bar");
      let authdata = await props.authData;
      setInterviewer(authdata.authData.authData.interviewer);
      setAdmin(authdata.authData.authData.admin);
    }
    setData();
  }, [props.authData]);

  const handleInterviewClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInterviewClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className="title">
            {"Hiring Portal" + tab}
          </Typography>
          <Button
            className={classes.logoutButton}
            color="inherit"
            onClick={() => {
              sessionStorage.clear();
              // setLogout(true);
              props.log_out();
              document.location.href = "/";
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Tooltip
            title="Dashboard"
            placement="left"
            arrow
            TransitionComponent={Zoom}
          >
            <Link className="nav-link" to="/hr/Dashboard">
              <ListItem
                button
                key="Dashboard"
                onClick={() => setTab(" - Dashboard")}
              >
                <ListItemIcon>
                  {" "}
                  <DashboardRoundedIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
          </Tooltip>
          <Tooltip
            title="Applicants"
            placement="left"
            arrow
            TransitionComponent={Zoom}
          >
            <Link className="nav-link" to="/hr/Applicants">
              <ListItem
                button
                key="Applicants"
                onClick={() => setTab(" - Applicants")}
              >
                <ListItemIcon>
                  {" "}
                  <EmojiPeopleRoundedIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Applicants" />
              </ListItem>
            </Link>
          </Tooltip>
          <Tooltip
            title="Jobs"
            placement="left"
            arrow
            TransitionComponent={Zoom}
          >
            <Link className="nav-link" to="/hr/Jobs">
              <ListItem button key="Jobs" onClick={() => setTab(" - Jobs")}>
                <ListItemIcon>
                  {" "}
                  <WorkRoundedIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Jobs" />
              </ListItem>
            </Link>
          </Tooltip>
          <Tooltip
            title="Interviews"
            placement="left"
            arrow
            TransitionComponent={Zoom}
          >
            <Link className="nav-link" to="/hr/interviews">
              <ListItem
                button
                key="Interviews"
                onClick={(e) => {
                  setTab(" - Interviews");
                  handleInterviewClick(e);
                }}
              >
                <ListItemIcon>
                  {" "}
                  <PeopleAltRoundedIcon />{" "}
                </ListItemIcon>
                <ListItemText
                  onClick={handleInterviewClick}
                  primary={
                    <>
                      Interviews <ArrowDropDownRoundedIcon />
                    </>
                  }
                />
              </ListItem>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                placement="left"
                onClose={handleInterviewClose}
                PaperProps={{ style: { minWidth: 200, maxWidth: 300 } }}
              >
                <MenuItem
                  onClick={() => {
                    handleInterviewClose();
                    setTab(" - Interviews");
                  }}
                >
                  <Link to="/hr/interviews/">Interviews Home</Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleInterviewClose();
                    setTab(" - Schedule Interviews");
                  }}
                >
                  <Link to="/hr/interviews/schedule">Schedule Interviews</Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleInterviewClose();
                    setTab(" - Pending Interviews");
                  }}
                >
                  <Link to="/hr/interviews/pendingInterviews">
                    Pending Interviews
                  </Link>
                </MenuItem>
              </Menu>
            </Link>
          </Tooltip>
        </List>

        <Divider />
        <List>
          {admin.isAdmin ? (
            <Tooltip
              title="Create New User"
              placement="left"
              arrow
              TransitionComponent={Zoom}
            >
              <Link className="nav-link" to="/hr/newUser">
                <ListItem
                  button
                  key="newUser"
                  onClick={() => setTab(" - Jobs")}
                >
                  <ListItemIcon>
                    {" "}
                    <PersonAddRoundedIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Create new user" />
                </ListItem>
              </Link>
            </Tooltip>
          ) : null}
          {interviewer.isInterviewer ? (
            <Tooltip
              title="Switch to Interviewer Page"
              placement="left"
              arrow
              TransitionComponent={Zoom}
            >
              <a className="nav-link" href="/">
                <ListItem
                  button
                  key="Switch"
                  onClick={() => setTab(" - Interviewer")}
                >
                  <ListItemIcon>
                    {" "}
                    <TransferWithinAStationRoundedIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Switch to Interviewer" />
                </ListItem>
              </a>
            </Tooltip>
          ) : null}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div id="header">{/* <Nav authData={authData}></Nav>  */}</div>

        <div className="containerHolder">
          <div id="Container">
            <Switch>
              {/* <Route exact path="/" component={DashboardContainer} /> */}
              <Route exact path="/hr" component={DashboardContainer} />
              <Route exact path="/hr/interviews" component={InterviewsHome} />
              <Route path="/hr/interviews/schedule" component={Schedule} />
              <Route
                path="/hr/interviews/pendingInterviews"
                component={PendingInterviews}
              />
              <Route path="/hr/Applicants" component={SortApplication} />
              <Route path="/hr/Dashboard" component={DashboardContainer} />
              <Route path="/hr/Jobs" component={JobsRoot} />
              <Route path="/hr/newUser" component={UserCreation} />
            </Switch>
          </div>
        </div>

        <div
          id="footer"
          className="fake-footer"
          onMouseEnter={() => setFooterClass("footer-open")}
        ></div>

        <div
          id="footer"
          className={footerClass}
          onMouseLeave={() => setFooterClass("footer-hide")}
        >
          @Team Conquerors
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    logedin: state.logedin,
    store: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    log_out: () => dispatch(log_out()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
