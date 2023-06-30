import React from "react";
import { NavLink } from "react-router-dom";

function DashboardButton({ title, navTo, value, PostType }) {
  return (
    <React.Fragment>
      <NavLink
        className="nav-link m-4"
        style={{ marginTop: 10 }}
        to={{ pathname: navTo }}
        state={{ givenPostType: PostType, title: title }}
      >
        <button className="DashboardButton">
          <h2 className="fonts">
            {title}&nbsp;
            <span className="badge rounded-pill text-bg-secondary">
              {value}
            </span>
          </h2>
        </button>
      </NavLink>
    </React.Fragment>
  );
}

export default DashboardButton;
