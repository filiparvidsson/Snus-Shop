import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { emailSignInStart, googleSignInStart } from "../../redux/User/user.actions";

import './styles.scss'
import Button from "../forms/button";
//import { signInWithGoogle } from "../../firebase/utils";

import AuthWrapper from "../authWrapper";
import FormInput from "../forms/formInput";
//import Button from "../forms/button";

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});
const SignIn = props => {
    const { currentUser } = useSelector(mapState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser){
            resetForm();
            //dispatch(resetAllAuthForms());
            console.log("I was successfull!")
            navigate('/');
        }
    }, [currentUser])

    const resetForm = () => {
            setEmail('');
            setPassword('');
    }

    const handleSubmit = e => {

        e.preventDefault();
        dispatch(emailSignInStart({ email, password} ));

    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
    }
   

        const configAuthWrapper = {
            headline: 'LogIn'
        }
        return (
        <AuthWrapper {...configAuthWrapper}>

                <div className="formWrap">
                    <form onSubmit={handleSubmit}>
                        <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                        />

                        <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                        />

                        <Button type="submit">
                            LogIn
                        </Button>

                        <div className="socialSignIn">
                            <div className="row">
                                <Button onClick = {handleGoogleSignIn}>
                                    SignIn With Google
                                </Button>
                            </div>
                        </div>

                        <div className="links">
                            <Link to="/recovery">
                                Reset Password
                            </Link>
                        </div>
                    </form>
                </div>
            </AuthWrapper>
        );

};

export default SignIn;