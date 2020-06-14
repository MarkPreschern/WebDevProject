import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import AttendeeService from "../services/AttendeeService";
import OrganizerService from "../services/OrganizerService";
import {selectAttendee} from "../actions/AttendeeActions";
import {selectOrganizer} from "../actions/OrganizerActions";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: "attendee",
            username: "",
            password: ""
        }
    }

    // transfers duplicate fields
    userTypeChange = (newUserType) => {
        if (newUserType === "attendee") {
            this.setState({userType: newUserType});
        } else if (newUserType === "organizer") {
            this.setState({userType: newUserType});
        }
    };

    // attempts to register user
    login = () => {
        if (this.state.userType === "attendee") {
            this.props.loginAttendee({username: this.state.username, password: this.state.password});
        } else if (this.state.userType === "organizer") {
            this.props.loginOrganizer({username: this.state.username, password: this.state.password});
        }
    };

    render() {
        return (
            <div className="text-center">
                <h3>Login</h3>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Role</label>
                    <div className="col-sm-9">
                        <select className="form-control mb-2">
                            <option onClick={() => this.userTypeChange("attendee")}>Event attendee</option>
                            <option onClick={() => this.userTypeChange("organizer")}>Event organizer</option>
                        </select>
                    </div>
                    <label className="col-sm-3 col-form-label">Username</label>
                    <div className="col-sm-9">
                        <input className="form-control mb-2"
                               placeholder="Username"
                               type="text"
                               value={this.state.username}
                               onChange={(event) => this.setState({username: event.target.value})}/>
                    </div>
                    <label className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-9">
                        <input className="form-control"
                               placeholder="Password"
                               type="password"
                               value={this.state.password}
                               onChange={(event) => this.setState({password: event.target.value})}/>
                    </div>
                </div>
                <Link to='/event/search'>
                    <button className="btn btn-dark" onClick={() => this.login()}>
                        Login
                    </button>
                </Link>
                <Link to='/event/search'>
                    <button className="btn ">
                        Cancel
                    </button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const dispatchToPropertyMapper = (dispatch) => {
    return {
        loginAttendee: async (attendee) => {
            const data = await AttendeeService.loginAttendee(attendee);
            // TODO: handle error message
            dispatch(selectAttendee(data))
        },
        loginOrganizer: async (organizer) => {
            const data = await OrganizerService.loginOrganizer(organizer);
            // TODO: handle error message
            dispatch(selectOrganizer(data))
        }
    }
};

export default connect(mapStateToProps, dispatchToPropertyMapper)(LoginComponent);