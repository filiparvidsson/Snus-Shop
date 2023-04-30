import React from "react";
import Snus from "../../snus/snusFile";
import Button from "../../forms/button";
import { useDispatch } from "react-redux";
import { removeCartItem, addProduct, reduceCartItem } from "../../../redux/Cart/cart.actions";

const Item = (product) => {

    const dispatch = useDispatch();
    //
    const {
        productCategory,
        productName,
        productFlavour,
        productColor,
        productBackground,
        productPrice,
        quantity,
        documentID
    } = product;

    const handleRemoveCartItem = (documentID) => {
        dispatch(
            removeCartItem({
                documentID
            })
        );
    }

    const handleAddProduct = (product) => {
        dispatch(
            addProduct(product)
        )
    }

    const handleReduceItem = (product) => {
        dispatch (
            reduceCartItem(product)
        )
    }


    return (
    <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
        <tbody>
            <tr>
                <td>
                    <Snus color={productColor} flavour={productFlavour} name={productName} background={productBackground}/>
                </td>
                <td>
                    {productName}
                </td>
                <td>
                    <span className="cartBtn" onClick={()=> handleReduceItem(product)}>
                        {`- `}
                    </span>
                    <span>
                        {quantity}
                    </span>
                    <span className="cartBtn" onClick={()=>handleAddProduct(product)}>
                        {` +`}
                    </span>
                </td>
                <td>
                    {productPrice}kr
                </td>
                <td align="center">
                    <Button onClick={()=> handleRemoveCartItem(documentID)}>
                        X
                    </Button>
                </td>
            </tr>
        </tbody>
    </table>
    );
};

export default Item;