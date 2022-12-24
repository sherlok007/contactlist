import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
    const { name, phone } = props.contact;
    return (
        <div className="item">
            <div className="content">
                <div className="header">{name}</div>
                <div>{phone}</div>
            </div>
            <i
                className="trash alternate outline icon"
                style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
                onClick={() => props.clickHander(phone)}
            ></i>
            <Link to={{ pathname: `/edit/${phone}`, state: { contact: props.contact } }}>
                <i className="edit alternate outline icon"
                    style={{ color: "blue", marginTop: "7px" }}
                ></i>
            </Link>
        </div>
    );
};

export default ContactCard;