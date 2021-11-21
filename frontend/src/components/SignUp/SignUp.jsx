import "./SignUp.css";
import React, { useState } from 'react'
import { NavLink, Redirect } from "react-router-dom";
import { createUser } from "../../services/userService"
import validateForm from "../common/validateForm";
import auth from "../../services/authService";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState(null);

    const checkForUser = () => {
        const user = auth.getCurrentUser();
        if (user) return true;
    }
    const handleSignUp = async () => {

        const valid = validateForm({ email: email, password: password, name: name })
        setErrors(valid.errors);
        console.log(errors);
        if (valid.isValid) {
            try {
                console.log("111");
                const res = await createUser({
                    email: email,
                    password: password,
                    name: name
                })
                
                console.log("222");
                auth.logInWithJwt(res.headers["x-auth-token"]);
                console.log("wowww")
                window.location = "/";
            } catch (ex) {
                console.log(ex);
                setErrors({ overall: ex.response?.data });
            }

        }

    }
    return (
        <div className="sign-up">
            {errors && <div className="error">{errors.overall}</div>}


            {checkForUser() ? <Redirect /> :

                <React.Fragment>
                    <div>
                        <input type="text" className="input" placeholder="name" onChange={(e) => setName(e.target.value)} />
                    </div>
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
                                    <h1>Sign Up</h1>
                                </div>
                                <div className="formbg-outer">
                                    <div className="formbg">
                                        <div className="formbg-inner padding-horizontal--48">
                                            <span className="padding-bottom--15">Create your account</span>
                                            <div className="field padding-bottom--24">
                                                <div className="grid--50-50">
                                                    <label for="name">Name</label>
                                                </div>
                                                {errors && <div className="error">{errors.name}</div>}
                                                <input type="text" className="name" onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="field padding-bottom--24">
                                                <label for="email">Email</label>
                                                {errors && <div className="error">{errors.email}</div>}
                                                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="field padding-bottom--24">
                                                <div className="grid--50-50">
                                                    <label for="password">Password</label>
                                                </div>
                                                {errors && <div className="error">{errors.password}</div>}
                                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            <div className="field padding-bottom--24">
                                                <button className="myBtnSubmit" onClick={handleSignUp}>submit</button>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="footer-link padding-top--24">
                                        <span>Have an account? <NavLink to="/login">Log In</NavLink></span>
                                        <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>


                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default SignUp
