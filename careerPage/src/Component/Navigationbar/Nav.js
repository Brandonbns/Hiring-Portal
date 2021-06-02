import React from 'react';
import './Nav.css';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import connect from "react-redux/es/connect/connect";



const navbar = (props) => {

    return (
        <div className = "navcolor">
            <nav className="navbar navbar-expand-lg  Navback-color  "  >

                <span className="navbar-brand mb-0 h1"> </span>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> </span>
                </button>

                { props.isAuthenticated  ?
                    <h2>Hi {props.f_name}</h2>
                :<p></p>}

                
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav nav-tabs  ">
                        <li className="nav-item  " style={{ width: "100px" }}>
                            <Link className="nav-link link-col" to='/' >
                                <span className="align-text-bottom"><HomeIcon /></span>Home
                            </Link>

                        </li>

                        { props.isAuthenticated  ?
                            <li className="nav-item" style={{width:"100px"}}>
                                <Link className="nav-link link-col" to='/userprofile'>
                                    <span className="align-text-bottom"><PersonIcon/></span>Account
                                </Link>
                            </li>
                            :<p></p>}


                        { !props.isAuthenticated  ?
                            <li className="nav-item " style={{width:"100px"}}>
                                <Link className="nav-link link-col" to="/signin" >
                                    <span className="align-text-bottom"><ExitToAppIcon/></span> Sign in
                                </Link>
                            </li>
                            :<p></p>}


                        { props.isAuthenticated  ?
                            <li className="nav-item " style={{width:"100px"}}>
                                <Link className="nav-link link-col" to='/logout'>
                                    <span className="align-text-bottom"><LockIcon/></span> Logout
                                </Link>
                            </li>
                            :<p></p>}

                        {/*{ props.isAuthenticated  ?*/}

                            {/*:<p></p>}*/}
                    </ul>
                </div>
            </nav>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {

        isAuthenticated: state.auth.token !== null,
        f_name: state.auth.f_name,
        id: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navbar);

