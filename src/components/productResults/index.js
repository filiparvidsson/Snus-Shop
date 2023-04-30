import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import { useNavigate, useParams } from "react-router-dom";
import Product from "./product";
import FormSelect from "../formSelect";
import LoadMore from "../loadMore";
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.product
});

const ProductResults = ({  }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { filterType } = useParams();
    const { products } = useSelector(mapState);
    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {

        dispatch(
            fetchProductsStart( { filterType })
        )

    }, [ filterType ]);

    const handleFilter = (e) => {

        const nextFilter = e.target.value;
        navigate(`/search/${nextFilter}`);

    };

    if(!Array.isArray(data)) return null;

    if(data.length < 1){
        return (
            <div>
                <p>
                    No search results.
                </p>
            </div>
        );
    }

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'Show all',
            value: ''
        }, {
            name: 'Fresh',
            value: 'Fresh'
        }, {
            name: 'Exotic',
            value: 'exotic'
        }],
        handleChange: handleFilter
    };

    const handleLoadMore = () => {

        dispatch(
            fetchProductsStart( { 
                filterType, 
                startAfterDoc: queryDoc,
                persistProducts: data
            
            })
        )

    };

    const configLoadMore = {
        onLoadMoreEvent: handleLoadMore,
    };

    return(
        <div className="products">

            <h1>
                Browse Products
            </h1>

            <FormSelect {...configFilters} />
        <div className="productResults">

        
            {data.map((products, pos) => {
                const { productPrice } = products;

                    if(typeof productPrice === 'undefined') return null;

                const configProduct = {

                    ...products

                }

                return (
                    
                    <Product {...configProduct}/>
                    
                );
            })}
            </div>

            <div>
                {!isLastPage && (
                    <LoadMore {...configLoadMore} />
                )}
                
            </div>

        </div>
    );
}

export default ProductResults;

