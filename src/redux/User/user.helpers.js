import { auth } from "../../firebase/utils"
import { GoogleProvider } from "../../firebase/utils";

export const handleResetPassowrdAPI = ( email ) => {
    console.log("the email is " + email)
    const config = {
        url: 'http://localhost:3000/login'
    }

    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email, config)
        .then(() => {
            
            resolve();
            //navigate('/');

        })
        .catch(() => {

            const err=['Email not found.'];
            reject(err);
            //setErrors(err);
        });
    })
};

export const handleGoogleSignInUser = (googleProvider) => {
        return auth.signInWithPopup(googleProvider);
}