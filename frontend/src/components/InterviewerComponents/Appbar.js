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
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import Menu from "@material-ui/core/Menu";

import TransferWithinAStationRoundedIcon from "@material-ui/icons/TransferWithinAStationRounded";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { log_out } from "../../globals";
import { connect } from "react-redux";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";
import AvTimerRoundedIcon from "@material-ui/icons/AvTimerRounded";

import drawerbg from "../../images/drawerbg2.jpg";
import { Button, Tooltip, Zoom } from "@material-ui/core";
import Upcoming from "./UpcomingInterviews/Upcoming";
import Pending from "./PendingInterviews/Pending";
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
    //backgroundImage: `url(${drawerbg})`,
    backgroundRepeat: "no-repeat",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    color: "#0009",
    backgroundColor: "#d93639ec",
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
  const [logout, setLogout] = useState(false);
  const [interviewer, setInterviewer] = useState({
    isInterviewer: "",
    interviewer_id: "",
  });
  const [admin, setAdmin] = useState({ isAdmin: "", admin_id: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [interviewerID, setInterviewerId] = useState(props.InterviewerID);
  const [hr, setHr] = useState(props.hr);
  const [footerClass, setFooterClass] = useState("footer-hide");

  useEffect(async () => {
    console.log(props, "in app bar");
    let { InterviewerID, hr } = await props;
    setHr(hr);
    setInterviewerId(InterviewerID);
  }, [props]);

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
                setLogout(true);
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
              title="Upcoming Interviews"
              placement="left"
              arrow
              TransitionComponent={Zoom}
            >
              <Link className="nav-link" to="/interviewer/upcoming">
                <ListItem
                  button
                  key="Upcoming"
                  onClick={() => setTab(" - Upcoming Interviews")}
                >
                  <ListItemIcon>
                    {" "}
                    <DateRangeRoundedIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Upcoming Interviews" />
                </ListItem>
              </Link>
            </Tooltip>
            <Tooltip
              title="Pending Interviews"
              placement="left"
              arrow
              TransitionComponent={Zoom}
            >
              <Link className="nav-link" to="/interviewer/pending">
                <ListItem
                  button
                  key="Pending"
                  onClick={() => setTab(" - Pending INterviews")}
                >
                  <ListItemIcon>
                    {" "}
                    <AvTimerRoundedIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Pending Interviews" />
                </ListItem>
              </Link>
            </Tooltip>
          </List>

          <Divider />
          <List>
            {hr.isHr ? (
              <Tooltip
                title="Switch to HRPage"
                placement="left"
                arrow
                TransitionComponent={Zoom}
              >
                <a className="nav-link" href="/">
                  <ListItem
                    button
                    key="Switch"
                    onClick={() => setTab(" - Jobs")}
                  >
                    <ListItemIcon>
                      {" "}
                      <TransferWithinAStationRoundedIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Switch to HR" />
                  </ListItem>
                </a>
              </Tooltip>
            ) : null}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div id="root2">
            <div id="header">{/* <Nav hr={hr}></Nav> */}</div>
            <div className="containerHolder">
              <div id="Container">
                <Switch>
                <Route
                  exact
                  path="/interviewer"
                  component={() => <Upcoming interviewerID={interviewerID} />}
                />
                <Route
                  path="/interviewer/upcoming"
                  component={() => <Upcoming interviewerID={interviewerID} />}
                />
                <Route
                  path="/interviewer/pending"
                  component={() => <Pending interviewerID={interviewerID} />}
                />
                </Switch>
              </div>
            </div>
          </div>

          <div
            id="footer"
            className="fake-footer"
            onMouseEnter={() => setFooterClass("footer-open")}
          ></div>

          <div
            id="footer"
            className="footer-open"
            onMouseLeave={() => setFooterClass("footer-hide")}
          >
            @Team Conquerors
          </div>
        </main>

        {/* <div id="footer">
                    @Team Conquerors
                </div> */}
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
