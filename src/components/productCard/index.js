import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Snus from "../snus/snusFile";
import { addProduct } from "../../redux/Cart/cart.actions";
import { fetchProductStart, setProduct } from "../../redux/Products/products.actions";
import Button from "../forms/button";
import './styles.scss';

const mapState = state => ({
    product: state.productsData.snus
});

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const { productID } = useParams();
    const { product } = useSelector(mapState);
    const {
        productCategory,
        productName,
        productFlavour,
        productColor,
        productBackground,
        productPrice
    } = product;

    useEffect(() => {
        console.log("nu hämtar vi snus")
        dispatch(
            fetchProductStart(productID)
        )

        return() => {
            dispatch(
                setProduct({})
            )
        }
    }, []);

    const handleAddToCart = (product) =>{
        if(!product) return;
        dispatch(
            addProduct(product)
        )
    }

    const configAddToCart = {
        type: "button"
    }

    return (
        <div className="productCard">
            {productColor && (<Snus color={productColor} flavour={productFlavour} name={productName} background={productBackground}/>)}
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                    {productPrice && (<span> {productPrice}kr </span>)}
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCart} onClick={()=>handleAddToCart(product)}>
                                Add to cart
                            </Button>

                        </div>
                    </li>
                    <li> 
                        <p>
                            Our Series X snus {productName} with a {productCategory} flavour of {productFlavour}.
                        </p>
                    </li>
                </ul>

            </div>
            
        </div>
        
    );
}

export default ProductCard;