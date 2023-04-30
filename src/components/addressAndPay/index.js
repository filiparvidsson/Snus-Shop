import React, { useEffect, useState } from "react";
import './styles.scss';
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import {Link, useNavigate} from "react-router-dom";
import Button from "../forms/button";
import Swish from './../../assets/swish.png';
import { clearCart } from "../../redux/Cart/cart.actions";
import { orderProducts } from "../../redux/Products/products.actions";

import AuthWrapper from "../authWrapper";
import FormInput from "../forms/formInput";

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

const AdressAndPay = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const { currentUser } = useSelector(mapState);
    const {cartItems, total} = useSelector(mapState);
    const [fullName, setFullName] = useState('');
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');

    useEffect(()=>{
        if(!(cartItems.length > 0)){
            navigate("/")
        }
    }, [])
    

    const handleSubmit = e =>{

        e.preventDefault();
        

            fetch('http://localhost:5000/swish/').then(res => {
                if(res.ok){
                    return res.json()
                }
            }).then(response => {
                
                if(response.Open[0].openForBusiness){
                    alert("Thanks for your order! Email verification has been sent.")
                    dispatch(
                        orderProducts({
                            cartItems,
                            total,
                            fullName,
                            adress,
                            city
                            }),
                    )
                    dispatch(
                        clearCart(),
                        navigate("/")
                    )
                    
                } 
                
                else if (!response.Open[0].openForBusiness){
                    alert("Sorry, we are not open for business at the moment.")
                }

                
            })
        //)
    }

    const resetForm = () => {

        setFullName('');
        setAdress('');
        setCity('');
    
    }

    

    const configAuthWrapper = {
        headline: 'Get your snus'
    }

    return (

    <AuthWrapper {...configAuthWrapper}>

        <div className="total">
            <span>
                Your order: {total}kr
            </span>
        </div>

            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <FormInput
                    type="text"
                    name="fullName"
                    value={fullName}
                    placeholder="Full name"
                    handleChange={e => setFullName(e.target.value)}
                    />

                    <FormInput
                    type="text"
                    name="adress"
                    value={adress}
                    placeholder="Adress"
                    handleChange={e => setAdress(e.target.value)}
                    />

                    <FormInput
                    type="text"
                    name="city"
                    value={city}
                    placeholder="City"
                    handleChange={e => setCity(e.target.value)}
                    />

                    <Button /*type="submit"*/ onClick={()=>handleSubmit()}>
                    <img id="swish" src={Swish} alt="moonbase logo"></img>
                    </Button>

                </form>
            </div>
        </AuthWrapper>
    );



}

export default AdressAndPay;

