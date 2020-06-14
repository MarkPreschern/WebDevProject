import React from 'react'
import {Link} from "react-router-dom";

export default class UPEventItemComponent
    extends React.Component {
    imageurl='https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'

    render() {
        return(
            <div className="">
                <Link to='/event/external/eventId'>
                    <img src={this.imageurl} className="rounded EB-item-pic" alt=""/>
                </Link>
            </div>
        )
    }
}