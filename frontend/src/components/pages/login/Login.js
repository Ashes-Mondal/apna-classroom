import React, { useState } from 'react';
import './Login.scss'
import img from '../../../images/login/undraw_Working_re_ddwy.svg'
import img1 from '../../../images/login/sign-up.svg'
import Form from './Form';

const Login = () => {
    const [loginOpen, setLoginOpen] = useState(true);
    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <form className="login-form">
                        <Form loginOpen={loginOpen} setLoginOpen={setLoginOpen}/>
                    </form>
                    <div className="login-right">
                        <div className="login-right-head">
                            {loginOpen?<h2>Welcome back to</h2>:<h2>Welcome to</h2>}
                            <h2>&lt; Project name &gt;</h2>
                            <hr />
                            {loginOpen?<h4>Sign in to continue to your account</h4>:<h4>Join with us for better Classroom Experience</h4>}
                        </div>
                        {loginOpen?<img src={img1} alt="" className="login-image" />:<img src={img} alt="" className="login-image" />}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
