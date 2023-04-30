import React from "react";
import { Link } from "react-router-dom";
import shopExotic from './../../assets/shopExotic.jpg'
import shopFresh from './../../assets/shopFresh.jpg'
import './styles.scss';

const Directory = props => {
    return(
        <div className="directory">
            <div className="wrap">
            <Link to="/search/Fresh">
            <div
            className="item"
            style={{
                backgroundImage: `url(${shopFresh})`
            }}
            >
                <a>
                    Shop Fresh
                </a>

            </div>
            </Link>

            <Link to="/search/exotic">
            <div
            className="item"
            style={{
                backgroundImage: `url(${shopExotic})`
            }}
            
            >

                <a>
                    Shop Exotic
                </a>
            </div>
            </Link>
            </div>
        </div>
    );
};

export default Directory;