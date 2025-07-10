import React, { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/fireabase/firebase.util';
import FormInput from '../form-input/form-input.component';
import "./sign-up-form.styles.scss";
import Button from '../button/button.component';


function SignUpForm() {
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Confirm password do not match");
        }

        try {
            let authUser = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(authUser.user, { displayName })
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use.");
            } else {
                console.log('User creation encountered an error', error);
            }
        }

    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name"
                    inputOptions={{
                        type: "text",
                        onChange: handleChange,
                        name: 'displayName',
                        value: displayName,
                        required: true
                    }} />

                <FormInput label="Email" inputOptions={{
                    type: "email",
                    onChange: handleChange,
                    name: 'email',
                    value: email,
                    required: true
                }} />

                <FormInput label="Password" inputOptions={{
                    type: "password",
                    onChange: handleChange,
                    name: "password",
                    value: password,
                    required: true
                }} />

                <FormInput label="Confirm Password" inputOptions={{
                    type: "password",
                    onChange: handleChange,
                    name: "confirmPassword",
                    value: confirmPassword,
                    required: true
                }} />

                <Button type="submit"> Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpForm