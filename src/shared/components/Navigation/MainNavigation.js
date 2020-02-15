import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import NavLink from "./NavLink";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElement/Backdrop";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <Fragment>
      {drawerIsOpen && <BackDrop onClick={closeDrawer} />}
      {drawerIsOpen && (
        <SideDrawer>
          <nav className="main-navigation__drawer-nav">
            <NavLink />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>

        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>

        <nav className="main-navigation__header-nav">
          <NavLink />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
