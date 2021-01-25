import React, { useState } from 'react'
import { connect } from 'react-redux';



import CustomButton from '../custom-button/custom-button.component';
import FormInput from './../form-input/form-input.component';

import { signUpStart } from './../../redux/user/user.actions';

import './sign-up.style.scss';


const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { displayName, email, password, confirmPassword } = userCredentials;
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('password not match');
            return
        }
        signUpStart({ displayName, email, password })
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setUserCredentials({ ...userCredentials, [name]: value })
    }

    return (
        <div className='sign-up'>
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    signUpStart: UserCredentials => dispatch(signUpStart(UserCredentials))
})
export default connect(null, mapDispatchToProps)(SignUp)