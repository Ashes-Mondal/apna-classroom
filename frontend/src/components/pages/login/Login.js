import React from 'react';
import './Login.scss'
import img from '../../../images/login/undraw_Working_re_ddwy.svg'

const Login = () => {
    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <form className="login-form">

                    </form>
                    <div className="login-right">
                        <div className="login-right-head">
                            <h2>Welcome back to</h2>
                            <h2>&lt; Project name &gt;</h2>
                            <hr/>
                            <h4>Sign in to continue to your account</h4>
                        </div>
                        <img src={img} alt="" className="login-image" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
