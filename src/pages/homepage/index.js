import React, {Component} from "react";
import Directory from './../../components/directory';
import './styles.scss';

class Homepage extends Component {
    render() {
        return(
            <section className='homepage'>
                <Directory />
            </section>
    
        );
    };
    
};

export default Homepage;