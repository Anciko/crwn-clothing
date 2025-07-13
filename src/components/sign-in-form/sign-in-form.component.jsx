import { auth, signInWithGooglePopup, createUserDocumentFromAuth, createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword } from '../../utils/fireabase/firebase.util';
import FormInput from '../form-input/form-input.component';
import "./sign-in-form.styles.scss";
import Button from '../button/button.component';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/user.context';


function SignInForm() {
    const defaultFormFields = {
        email: '',
        password: '',
    };
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const signInWithGoogle = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user); // set global state current user 
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                alert("Invalid Email and Password.");
            } else {
                console.log('Credential Error.', error);
            }
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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

                <div className='buttons-container'>
                    <Button type="submit"> SIGN IN </Button>

                    <Button 
                        buttonType="google"
                        onClick={signInWithGoogle}>
                        GOOGLE SIGN IN
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm