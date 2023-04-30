import React from "react";
import { Link } from "react-router-dom";
import Snus from "../../snus/snusFile";
import Button from "../../forms/button";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/Cart/cart.actions";

const Product = (product) => {

    const dispatch = useDispatch();

    const { 
        documentID,
        productName,
        productFlavour,
        productColor,
        productBackground,
        productPrice

    } = product;

    if(!documentID || typeof productPrice === 'undefined') return null;

    const configAddToCartButton = {
        type:'button'
    };

    const handleAddToCart = (product) => {
        if(!product) return;
        dispatch (
            addProduct(product)
        )
    };

    return (

        <div className="product">
            <div className="thumb">
            <Link to={`/product/${documentID}`}>
            <Snus color={productColor} flavour={productFlavour} name={productName} background={productBackground}/>
            </Link>
            </div>
        

            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                        <Link to={`/product/${documentID}`}>
                        {productName}
                        </Link>
                        </span>
                    </li>
                    <li>
                        <span className="price">
                        {productPrice}kr
                        </span>
                    </li>

                    <li>
                        <div className="addToCart">
                        <Button {...configAddToCartButton} onClick={()=> handleAddToCart(product)}>
                            Add to cart
                        </Button>
                        </div>
                    </li>
                </ul>

            </div>
            
        </div>

    );
};

export default Product;