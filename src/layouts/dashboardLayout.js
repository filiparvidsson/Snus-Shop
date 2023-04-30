import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from './../redux/User/user.actions';
import { useNavigate } from 'react-router-dom';

import Header from './../components/header';
import VerticalNav from './../components/verticalNav';
import Footer from './../components/footer';

const DashBoardLayout = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
    navigate("/");
  };

  return (
    <div className="dashboardLayout">
      <Header {...props} />
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/dashboard">
                  Home
                </Link>
              </li>
              <li>
                <span className="signOut" onClick={() => signOut()}>
                  Sign Out
                </span>
              </li>
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

export default DashBoardLayout;