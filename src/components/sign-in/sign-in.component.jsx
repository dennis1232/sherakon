import './sign-in.style.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux';

import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handelSubmit = async e => {
        e.preventDefault();
        const { emailSignInStart } = this.props
        const { email, password } = this.state;
        emailSignInStart(email, password)
    }

    handleChange = async e => {
        const { value, name } = e.target;
        this.setState({ [name]: value })
    }


    render() {
        const { googleSignInStart } = this.props
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handelSubmit} >
                    <FormInput type="email" name="email" handleChange={this.handleChange} value={this.state.email} label='email' required />
                    <FormInput handleChange={this.handleChange} type="password" name="password" value={this.state.password} label='password' required />
                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >Sign in with google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})
export default connect(null, mapDispatchToProps)(SignIn)