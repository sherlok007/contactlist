import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditContact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('');
    const [watsapp, setWatsapp] = useState('');
    let watsappRef = useRef();
    const items = JSON.parse(localStorage.getItem('contactList'));

    useEffect(() => {
        getEditData();
    }, []);

    const handleRadio = (e) => {
        console.log(e.target.value);
        watsappRef = e.target.value;
    }

    const formHandler = (event) => {
        event.preventDefault();
        const data = [{
            name: name,
            phone: phone,
            type: type,
            watsapp: watsappRef,
        }];
        updateContact(data);
        navigate('/');
    };

    const updateContact = (data) => {
        let items = JSON.parse(localStorage.getItem('contactList'));
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (items[i].phone === data[j].phone) {
                    items[i].name = data[j].name;
                    items[i].type = data[j].type;
                    items[i].watsapp = data[j].watsapp;
                }
            }
        }
        console.log(data);
        localStorage.setItem('contactList', JSON.stringify(items));
    }

    const getEditData = () => {
        if (items.length) {
            items.forEach((x, y) => {
                if (x.phone === id) {
                    setName(x.name); setPhone(x.phone); setType(x.type); setWatsapp(x.watsapp);
                }
            });
        }
    }
    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={(e) => formHandler(e)}>
                <input type="hidden" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="hidden" ref={watsappRef} />
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option>---Select---</option>
                        <option key={1} value="personal">Personal</option>
                        <option key={2} value="office">Office</option>
                    </select>
                </div>
                <div className="field">
                    <label>Is Watsapp</label>
                    <input type="radio" value="yes" name="watsapp" onChange={handleRadio} checked={ watsapp==="yes" ? true : false } /> Yes
                    <input type="radio" value="no" name="watsapp" onChange={handleRadio} checked={ watsapp==="no" ? true : false } /> No
                </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
}

export default EditContact;