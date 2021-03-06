import React from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
    DEFAULT_EVENT_IMAGE_URL,
    DEFAULT_PROFILE_FEMALE_IMAGE_URL,
    DEFAULT_PROFILE_MALE_IMAGE_URL, DEFAULT_PROFILE_OTHER_IMAGE_URL
} from "../../common/Constants";

const EventAttendeesComponent = (props) =>
    <span className="text-center m-2">
        <h6>{props.attendees.length} people liked this event</h6>
        <p>Click on an attendee to view their profile and start messaging!</p>
        <div className="d-flex justify-content-around">
            <div className="EB-scroll-list-horizontal">
                <div className="EB-list-horizontal">
                    {
                        props.attendees.map(attendee =>
                        <div key={attendee._id} className="EB-list-content-horizontal text-center">
                            <Link to={`/profile${(props.attendee._id !== -1 && props.attendee._id === attendee._id) ? "" : `/${attendee._id}`}`}>
                                {
                                    !(attendee.image_url === '' || attendee.image_url === undefined) ?
                                    <img className="rounded EB-item-pic" src={attendee.image_url} alt={DEFAULT_EVENT_IMAGE_URL}/>
                                    :
                                    <img className="rounded EB-item-pic" src={defaultImage(attendee.gender)} alt=""/>
                                }
                                <h6 className='EB-list-text'>
                                    {attendee.name}
                                </h6>
                            </Link>
                        </div>)
                    }
                </div>
            </div>
        </div>
    </span>;

const defaultImage = (gender) => {
    if (gender === "Male") {
        return DEFAULT_PROFILE_MALE_IMAGE_URL;
    } else if (gender === "Female") {
        return DEFAULT_PROFILE_FEMALE_IMAGE_URL;
    } else {
        return DEFAULT_PROFILE_OTHER_IMAGE_URL;
    }
};

const mapStateToProps = state => ({
    attendee: state.AttendeeReducer.attendee
});

export default connect(mapStateToProps)(EventAttendeesComponent);