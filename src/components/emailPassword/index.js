import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordStart, resetUserState } from "../../redux/User/user.actions";
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { withRouter } from "../../redux/withRouter";

import AuthWrapper from "../authWrapper";
import FormInput from "../forms/formInput";
import Button from "../forms/button";
import userTypes from "../../redux/User/user.types";

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = props => {

const navigate = useNavigate();
const {resetPasswordSuccess, userErr} = useSelector(mapState);
const dispatch = useDispatch();
const [email, setEmail] = useState('');
const [errors, setErrors] = useState([]);

useEffect(()=> {
    if(resetPasswordSuccess) {
        dispatch(resetUserState());
        navigate('/login');
    }

}, [resetPasswordSuccess]);

useEffect(()=> {
    if(Array.isArray(userErr) && userErr.length > 0 ){
        setErrors(userErr);
    }

}, [userErr]);

    const handleSubmit = e => {
        e.preventDefault();
        console.log("första gången jag ser mejlen: " + email);
        dispatch(resetPasswordStart({ email }));


    }

        const configAuthWrapper = {
            headline: 'Email Password'
        }

        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    {errors.length > 0 &&(
                        <ul>
                            {errors.map((e, index) => {
                                return (
                                    <li key={index}>
                                        {e}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <form onSubmit={handleSubmit}>
                        <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                        />

                        <Button type="submit">
                            Email Password
                        </Button>
                    </form>
                </div>

            </AuthWrapper>
        );

}

export default EmailPassword; //withRouter(EmailPassword)

// function WithNavigate(props) {
//     let navigate = useNavigate();
//     return <MyComponent {...props} navigate={navigate} />
// }


