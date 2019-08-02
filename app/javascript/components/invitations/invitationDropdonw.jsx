import React from "react";
import axios from "axios";

const InvitationDropdown = ({ visibility, invitations, fetchInvitations }) => {
  const accept = inviteId => {
    axios
      .post("/api/v1/invitations/accept", {
        id: inviteId,
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(fetchInvitations);
  };

  const decline = inviteId => {
    axios
      .post("/api/v1/invitations/decline", {
        id: inviteId,
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(fetchInvitations);
  };

  return (
    visibility && (
      <div className="invitations-wrapper">
        <div className="row invitations-header">
          <div className="col text-center">Invitations</div>
        </div>
        {invitations.map(invite => {
          return (
            <div key={invite.id} className="invite-content">
              <hr className="divider" />
              <div className="description">
                {invite.event.owner} invited you to play{" "}
                {invite.event.game.title}!
              </div>
              <div className="event-link">
                <a href={`/events/${invite.event.id}`}>Go to event -></a>
              </div>
              <div className="row">
                <div className="col text-center">
                  <button
                    type="button"
                    className="response-button accept"
                    onClick={() => {
                      accept(invite.id);
                    }}
                  >
                    Accept
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    type="button"
                    className="response-button decline"
                    onClick={() => {
                      decline(invite.id);
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default InvitationDropdown;
