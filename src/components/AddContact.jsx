import React, { useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
    const navigate = useNavigate();
    const nameRef = useRef();
    const phoneRef = useRef();
    const typeRef = useRef();
    let watsappRef = useRef();

    const handleRadio = (e) => {
        watsappRef = e.target.value;
    }

    const formHandler = useCallback(() => (event) => {
        event.preventDefault();
        const data = [{
            name: nameRef.current?.value,
            phone: phoneRef.current?.value,
            type: typeRef.current?.value,
            watsapp: watsappRef
        }];
        if (localStorage.getItem('contactList') !== null) {
            updateContact(data);
        } else {
            localStorage.setItem('contactList', JSON.stringify(data));
        }
        navigate('/');
    }, []);

    const updateContact = (data) => {
        let items = JSON.parse(localStorage.getItem('contactList'));
        for (let i = 0; i < items.length; i++) {
            if (items[i].phone === data[0].phone) {
                alert("This phone number already exists");
                return false;
            }
        }
        items.push(data[0]);
        localStorage.setItem('contactList', JSON.stringify(items));
    }

    return (
        <div className="ui main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={formHandler()}>
                <input type="hidden" ref={watsappRef} />
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        ref={nameRef}
                    />
                </div>
                <div className="field">
                    <label>Phone</label>
                    <input
                        type="number"
                        name="phone"
                        placeholder="Phone"
                        ref={phoneRef}
                    />
                </div>
                <div className="field">
                    <label>Type</label>
                    <select
                        name="type"
                        ref={typeRef}
                    >
                        <option>---Select---</option>
                        <option key={1} value="personal">Personal</option>
                        <option key={2} value="office">Office</option>
                    </select>
                </div>
                <div className="field">
                    <label>Is Watsapp</label>
                    <input type="radio" value="yes" name="watsapp" onClick={(e) => handleRadio(e)} /> Yes
                    <input type="radio" value="no" name="watsapp" onClick={(e) => handleRadio(e)} /> No
                </div>
                <button className="ui button blue">Add</button>
            </form>
        </div>
    );
}

export default AddContact;
