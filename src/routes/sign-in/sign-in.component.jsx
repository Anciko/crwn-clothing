import React from 'react'
import { signInWithGooglePopup } from '../../utils/fireabase/firebase.util'
import { createUserDocumentFromAuth } from '../../utils/fireabase/firebase.util'

const SignIn = () => {
    const logGoogleUser = async() => {
        const response = await signInWithGooglePopup();
        console.log(response);
        
        createUserDocumentFromAuth(response.user);
    }
    return (
        <>
            <h1>SignIn Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
        </>
    )
}

export default SignIn