import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBValidation,
    MDBValidationItem,
}
    from 'mdb-react-ui-kit';
import axios from "axios";
import { BaseURL } from './BaseURL';

import { useNavigate } from 'react-router-dom';

export default function Registration() {

    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        name: '', email: '', dob: '', phoneNumber: ''
    });


    const [validationErrors, setValidationErrors] = useState({
        name: '', email: '', dob: '', phoneNumber: ''
    });


    const [validNumber, setValidNumber] = useState(true)

    const formHandle = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }


    // ########################## Submitting Form #######################################

    const submitForm = async () => {
        const isValid = validateForm();
        
        const data = new FormData();
        if (isValid) {
            data.append('name', formValue.name);
            data.append('dob', formValue.dob);
            data.append('contact', formValue.phoneNumber);
            data.append('email', formValue.email);

            await axios.post(`${BaseURL}/register`, data)
                .then((res) => {
                    console.log(res);
                    setValidNumber(true);
                    navigate("/users");
                })
                .catch((err) => {
                    let error = err.code;
                    if (error === "ERR_BAD_REQUEST") {
                        setValidNumber(false);
                    }

                })
        }

    }

    // ########################### Validating Email via RexEx ##############################

    const isValidEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    // ########################## Validating Age ###########################################

    const isValidAge = (date) => {
        const dob = new Date(date);
        const curYear = new Date(Date.now()).getFullYear();
        const dobYear = dob.getFullYear();
        const age = curYear - dobYear;

        if (age < 18) {
            return false
        } else {
            return true
        }
    }


    // ######################### Validating Phone Number #########################################






    // ############################# Validating Form Values #################################

    const validateForm = () => {
        let isValid = true;
        const error = { name: '', email: '', dob: '', phoneNumber: '' }

        if (!formValue.name) {
            error.name = "Please Enter your name";
            isValid = false
        }

        if (!formValue.email) {
            error.email = "Please Enter an email";
            isValid = false;
        } else if (!isValidEmail(formValue.email)) {
            error.email = "Please Enter a valid email";
            isValid = false;
        }
        if (!formValue.dob) {
            error.dob = "Please Enter DOB";
            isValid = false;
        } else if (!isValidAge(formValue.dob)) {
            error.dob = "You are not allowd";
            isValid = false;
        }
        if (!formValue.phoneNumber) {
            error.phoneNumber = "Invalid Phone Number";
            isValid = false;
        }

        setValidationErrors(error);
        return isValid;
    }


    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', backgroundSize: 'cover' }}>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                <MDBValidation isValidated>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                        <MDBValidationItem feedback={validationErrors.name} invalid={true}>
                            <MDBInput wrapperClass='mb-4' value={formValue.name} name='name' label='Your Name' size='lg' id='form1' type='text' onChange={formHandle} required />
                        </MDBValidationItem>

                        <MDBValidationItem feedback={validationErrors.phoneNumber} invalid>
                            <MDBInput wrapperClass='mb-4' value={formValue.phoneNumber} name='phoneNumber' label='Phone Number' size='lg' id='form2' type='text' onChange={formHandle} required />
                            <span className={`${validNumber ? 'd-none' : 'd-block text-danger my-2'}`}> Invalid Number </span>
                        </MDBValidationItem>

                        <MDBValidationItem feedback={validationErrors.email} invalid>
                            <MDBInput wrapperClass='mb-4' value={formValue.email} name='email' label='Your Email' size='lg' id='form3' type='email' onChange={formHandle} required />
                        </MDBValidationItem>

                        <MDBValidationItem className='col-12' feedback={validationErrors.dob} invalid={true}>
                            <MDBInput wrapperClass='mb-4' label='Date of Birth' value={formValue.dob} name='dob' size='lg' id='form4' type='date' onChange={formHandle} required />
                        </MDBValidationItem>

                        <MDBBtn type='submit' onClick={submitForm} className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
                    </MDBCardBody>
                </MDBValidation>
            </MDBCard>
        </MDBContainer>
    );
}