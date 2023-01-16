import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const Contacts = () => {
    const [contact, setContact] = useState([]);
    const inputEl = useRef("");
    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = () => {
        try {
            const items = JSON.parse(localStorage.getItem('contactList'));
            if (items.length) {
                setContact(items);
            }
        } catch (err) {
            return []
        }
    }

    const deletetHandler = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to delete?"
        )
        if (confirmBox === true) {
            let items = JSON.parse(localStorage.getItem('contactList'));
            items.splice(items.findIndex(e => e.phone === id), 1);
            setContact(items);
            localStorage.setItem('contactList', JSON.stringify(items));
        }       
    };

    const renderContactList = contact.map((conc) => {
        return (
            <ContactCard
                contact={conc}
                key={conc.phone}
                clickHander={deletetHandler}
            />
        );
    });

    const getSearchTerm = () => {
        // searchKeyword(inputEl.current.value);
    };

    return (
        <div className="main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input
                        ref={inputEl}
                        type="text"
                        placeholder="Search Contacts"
                        className="prompt"
                        // value={term}
                        onChange={getSearchTerm}
                    />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList.length > 0
                    ? renderContactList
                    : "No Contacts available"}
            </div>
        </div>
    )
}

export default Contacts;