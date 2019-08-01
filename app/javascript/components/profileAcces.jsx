import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../../bin.png";
import InviteIcon from "./invitations/inviteIcon";
import InvitationDropdown from "./invitations/invitationDropdonw";

const Profile = () => {
  const [state, updateState] = useState({
    loading: true,
    invitations: [],
    visibility: false
  });

  const fetchInvitations = () => {
    axios
      .get("/api/v1/invitations", {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(response => {
        updateState({
          invitations: response.data.data,
          loading: false,
          visibility: false
        });
      });
  };

  const invitationsPending = () => {
    return state.invitations.some(invite => {
      return invite.status === "pending";
    });
  };

  const toggleDropdown = () => {
    updateState(rest => {
      return { ...rest, visibility: !state.visibility };
    });
  };

  useEffect(fetchInvitations, []);

  return (
    <div className="logoName">
      <div className="logo-wrapper">
        <a href="https://www.google.com/">
          <img className="logo" src={logo} />
        </a>
        <div className="binargames my-auto">
          <h2 className="binar">inar</h2>
          <h2 className="games">Games</h2>
        </div>
      </div>
      <div className="drop">
        <div>
          <InviteIcon
            pending={invitationsPending()}
            handleClick={toggleDropdown}
          />
          <InvitationDropdown
            visibility={state.visibility}
            invitations={state.invitations}
            fetchInvitations={fetchInvitations}
          />
        </div>
        <div className="dropdown">
          <button className="dropbtn">More</button>
          <div className="dropdown-content">
            <a
              rel="nofollow"
              className="dropdown-font"
              data-method="get"
              href="/users/edit"
            >
              Settings
            </a>
            <a
              rel="nofollow"
              data-method="delete"
              className="dropdown-font"
              href="/users/sign_out"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
