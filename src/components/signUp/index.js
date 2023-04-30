import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAuthForms, signUpUserStart } from "../../redux/User/user.actions";
import { useNavigate } from "react-router-dom";
import './styles.scss';

//import {auth, handleUserProfile} from './../../firebase/utils'

import AuthWrapper from "../authWrapper";
import FormInput from "../forms/formInput";
import Button from "../forms/button";

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
})

const Signup = props => {

    const {currentUser, userErr} = useSelector(mapState);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

                

    useEffect(() => {
        if(currentUser){
            console.log("Nu kommer du redirectas");
            reset();
            
            //dispatch(resetAllAuthForms);
            navigate('/');
        }

    }, [currentUser]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0){
            console.log("lösenordet är fel")
            setErrors(userErr);
            
        }
    }, [userErr]);

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }));

    }

        
        const configAuthWrapper = {
            headline: 'Registration'
        }

        return (
            
            <AuthWrapper {...configAuthWrapper}>
                    

                    <div className="formwrap">

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}>
                                        {err}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <form onSubmit={handleFormSubmit}>
                        <FormInput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={e => setDisplayName(e.target.value)}
                        />

                        <FormInput 
                        type="text"
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

                        <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={e => setConfirmPassword(e.target.value)}
                        />

                        <Button type="submit">
                            Register
                        </Button>

                    </form>
                    </div>
                </AuthWrapper>
        );
}

export default Signup;
