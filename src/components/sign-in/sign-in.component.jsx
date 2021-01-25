import './sign-in.style.scss'
import React, { useState } from 'react'
import { connect } from 'react-redux';

import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' })

    const { email, password } = userCredentials;

    const handelSubmit = async e => {
        e.preventDefault();
        emailSignInStart(email, password)
    }

    const handleChange = async e => {
        const { value, name } = e.target;
        setCredentials({ ...userCredentials, [name]: value })
        emailSignInStart(email, password)
    }


    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handelSubmit} >
                <FormInput type="email" name="email" handleChange={handleChange} value={email} label='email' required />
                <FormInput handleChange={handleChange} type="password" name="password" value={password} label='password' required />
                <div className="buttons">
                    <CustomButton type="submit">Sign in</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >Sign in with google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})
export default connect(null, mapDispatchToProps)(SignIn)