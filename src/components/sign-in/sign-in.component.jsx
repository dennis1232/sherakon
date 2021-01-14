import './sign-in.style.scss'
import React, { Component } from 'react'
import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';
import { auth, signInWithGoogle } from './../../firebase/firebase.utils';
export default class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handelSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (err) {
            console.log(err);
        }
    }

    handleChange = async e => {
        const { value, name } = e.target;
        this.setState({ [name]: value })
    }


    render() {

        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handelSubmit} >
                    <FormInput type="email" name="email" handleChange={this.handleChange} value={this.state.email} label='email' required />
                    <FormInput handleChange={this.handleChange} type="password" name="password" value={this.state.password} label='password' required />
                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn >Sign in with google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

