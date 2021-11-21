import './Login.css';
import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import auth from "../../services/authService"

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(null);

    const HandleLogIn = async () => {
        try {
            await auth.login(email, password);
            window.location = "/";
        } catch (ex) {
            setErrors({ message: ex.response.data });
        }
    }
    const checkForUser = () => {
        const user = auth.getCurrentUser();
        if (user) return true;
    }
    return (

        <div className="log-in">
            {checkForUser() ? <Redirect to="/" /> :
                <React.Fragment>
                    <div className="login-root">
                        <div className="box-root flex-flex flex-direction--column" style={{ minHeight: "100vh", flexGrow: "1" }} >
                            <div className="loginbackground box-background--white padding-top--64">
                                <div className="loginbackground-gridContainer">
                                    <div className="box-root flex-flex" style={{ gridArea: "top / start / 8 / end" }}>
                                        <div className="box-root"
                                            style={{ backgroundImage: "linear-gradient(white 0%, rgb(247, 250, 252) 33%)", flexGrow: "1" }}>
                                        </div>
                                    </div>
                                    <div className="box-root flex-flex" style={{ gridArea: "4 / 2 / auto / 5" }}>
                                        <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: "1" }}>
                                        </div>
                                    </div>
                                    <div className="box-root flex-flex" style={{ gridArea: "6 / start / auto / 2" }}>
                                        <div className="box-root box-background--blue800" style={{ flexGrow: "1" }}></div>
                                    </div>
                                    <div className="box-root flex-flex" style={{ gridArea: "7 / start / auto / 4" }}>
                                        <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: "1" }}></div>
                                    </div>
                                    <div className="box-root flex-flex" style={{ gridArea: "8 / 4 / auto / 6" }}>
                                        <div className="box-root box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: "1" }}>
                                        </div>
                                    </div>
                                    <div className="box-root flex-flex" style={{ gridArea: "2 / 15 / auto / end" }}>
                                        <div className="box-root box-background--cyan200 animationRightLeft tans4s" style={{ flexGrow: "1" }}>
                                        </div>
                                    </div>
                                    <div className="box-root flex-flex" style={{ gridArea: "3 / 14 / auto / end" }}>
                                        <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: "1" }}></div>
                                    </div>
                                    <div className="box-root flex-flex" style={{ gridArea: "4 / 17 / auto / 20" }}>
                                        <div className="box-root box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: "1" }}>
                                        </div>
                                    </div>
                                    <div className="box-root flex-flex" style={{ gridArea: "5 / 14 / auto / 17" }}>
                                        <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{ flexArow: "1" }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: "1", zIndex: "9" }}>
                                <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                                    <h1>Sign In</h1>
                                </div>
                                <div className="formbg-outer">
                                    <div className="formbg">
                                        <div className="formbg-inner padding-horizontal--48">
                                            <span className="padding-bottom--15">Sign in to your account</span>
                                            <div className="field padding-bottom--24">
                                                <label for="email">Email</label>
                                                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="field padding-bottom--24">
                                                <div className="grid--50-50">
                                                    <label for="password">Password</label>
                                                </div>
                                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            {errors && <div className="error">{errors.message}</div>}
                                            <div className="field padding-bottom--24">
                                                <button className="myBtnSubmit" onClick={HandleLogIn}>Log In</button>                                                </div>


                                        </div>
                                    </div>
                                    <div className="footer-link padding-top--24">
                                        <span>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></span>
                                        <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </React.Fragment>
            }
        </div>

    )
}

export default Login
