import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignOutUserStart } from '../redux/User/user.actions';
import { checkUserIsAdmin } from '../utils';

import Header from './../components/header';
import VerticalNav from './../components/verticalNav';
import Footer from './../components/footer';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const AdminLayout = props => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  

  const { currentUser } = useSelector(mapState);

  const isAdmin = checkUserIsAdmin(currentUser);

  const signOut = () => {
    dispatch(SignOutUserStart());
  };

  useEffect(()=>{

    (fetch('http://localhost:5000/swish/').then(res => {
                if(res.ok){
                    return res.json()
                }
            }).then(response => {
              setIsOpen(response.Open[0].openForBusiness)    
              
            }))

  },[])

  const handleStoreStatus = async () => {
    await fetch('http://localhost:5000/storeStatus/', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({isAdmin:isAdmin})
    }).then(res => {
                if(res.ok){
                    return res.json()
                }
            })
            .then(response => {
              setIsOpen(response.Open[0].openForBusiness);

              console.log("is store open: " + isOpen)

              
            })
  }

  

  

  return (
    <div className="adminLayout">
      <Header {...props} />
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/admin">
                  Home
                </Link>
              </li>
              <li>
                <span className="signOut" onClick={() => signOut()}>
                  Sign Out
                </span>
              </li>
              { isOpen ? (<li>
                <span id="storeIsOpen" onClick={() => handleStoreStatus()}>
                  Store is Live
                </span> 
              </li>):
              (<li>
                <span id="storeIsClosed" onClick={() => handleStoreStatus()}>
                  Store is Closed
                </span> 
              </li>)}
            </ul>
          </VerticalNav>
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;