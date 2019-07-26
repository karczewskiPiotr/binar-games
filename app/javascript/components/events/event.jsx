import React, { useState, useEffect } from "react";

const Event = ({ fetchEvents, event }) => {
  return (
      <div className="event-rows">
            <a href={`/events/${event.id}`} className="row event">
                <div className="col-md" id="col_owned">{event.title}</div>
                <div className="col-md" id="col_owned">{event.event_date}</div>
                <div className="col-md" id="col_owned">{event.event_time} </div>
            </a>
      </div>
    
  );
};

export default Event;