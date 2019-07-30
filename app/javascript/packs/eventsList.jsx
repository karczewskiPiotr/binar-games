import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Event from "../components/events/event";
import SortEventsBtn from "../components/events/sortEventsBtn";
import LoadingIcon from "../components/loadingIcon";
import FlipMove from "react-flip-move";

const compare = (a, b) => (b > a) - (b < a);

const EventsList = () => {
  const [state, updateState] = useState({
    events: [],
    events_owned: [],
    loading: true,
    sortCondition: "title_asc",
    sortConditionOwned: "title_owned_asc"
  });
  const fetchEvents = () => {
    axios
      .get("/api/v1/events", {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(response => {
        updateState({
          events: response.data.data
            .sort((a, b) => {
              return (
                compare(b.title.toLowerCase(), a.title.toLowerCase()) ||
                compare(a.event_date, b.event_date) ||
                compare(a.event_time, b.event_time)
              );
            })
            .filter(event => !event.is_owner),
          events_owned: response.data.data
            .sort((a, b) => {
              return (
                compare(b.title.toLowerCase(), a.title.toLowerCase()) ||
                compare(a.event_date, b.event_date) ||
                compare(a.event_time, b.event_time)
              );
            })
            .filter(event => event.is_owner),
          loading: false,
          sortCondition: "title_asc",
          sortConditionOwned: "title_owned_asc"
        });
      });
  };

  const handleSort = sortCondition => {
    updateState(rest => {
      return { ...rest, sortCondition: sortCondition };
    });
  };
  const handleSortOwned = sortConditionOwned => {
    updateState(rest => {
      return { ...rest, sortConditionOwned: sortConditionOwned };
    });
  };
  const sortEvents = (a, b) => {
    switch (state.sortCondition) {
      case "title_asc":
        return (
          compare(b.title.toLowerCase(), a.title.toLowerCase()) ||
          compare(a.event_date, b.event_date) ||
          compare(a.event_time, b.event_time)
        );
      case "title_desc":
        return (
          compare(a.title.toLowerCase(), b.title.toLowerCase()) ||
          compare(a.event_date, b.event_date) ||
          compare(a.event_time, b.event_time)
        );
      case "date_asc":
        return (
          compare(b.event_date, a.event_date) ||
          compare(a.title.toLowerCase(), b.title.toLowerCase()) ||
          compare(a.event_time, b.event_time)
        );
      case "date_desc":
        return (
          compare(a.event_date, b.event_date) ||
          compare(a.title.toLowerCase(), b.title.toLowerCase()) ||
          compare(a.event_time, b.event_time)
        );
      case "time_asc":
        return (
          compare(b.event_time, a.event_time) ||
          compare(a.event_date, b.event_date) ||
          compare(a.title.toLowerCase(), b.title.toLowerCase())
        );
      case "time_desc":
        return (
          compare(a.event_time, b.event_time) ||
          compare(a.event_date, b.event_date) ||
          compare(a.title.toLowerCase(), b.title.toLowerCase())
        );
    }
  };
  const sortEventsOwned = (a, b) => {
    switch (state.sortConditionOwned) {
      case "title_owned_asc":
        return (
          compare(b.title.toLowerCase(), a.title.toLowerCase()) ||
          compare(a.event_date, b.event_date) ||
          compare(a.event_time, b.event_time)
        );
      case "title_owned_desc":
        return (
          compare(a.title.toLowerCase(), b.title.toLowerCase()) ||
          compare(a.event_date, b.event_date) ||
          compare(a.event_time, b.event_time)
        );
      case "date_owned_asc":
        return (
          compare(b.event_date, a.event_date) ||
          compare(a.title.toLowerCase(), b.title.toLowerCase()) ||
          compare(a.event_time, b.event_time)
        );
      case "date_owned_desc":
        return (
          compare(a.event_date, b.event_date) ||
          compare(a.title.toLowerCase(), b.title.toLowerCase()) ||
          compare(a.event_time, b.event_time)
        );
      case "time_owned_asc":
        return (
          compare(b.event_time, a.event_time) ||
          compare(a.event_date, b.event_date) ||
          compare(a.title.toLowerCase(), b.title.toLowerCase())
        );
      case "time_owned_desc":
        return (
          compare(a.event_time, b.event_time) ||
          compare(a.event_date, b.event_date) ||
          compare(a.title.toLowerCase(), b.title.toLowerCase())
        );
    }
  };
  useEffect(fetchEvents, []);

  return (
    <>
      <div className="owned">My events:</div>
      <div className="row header">
        <div className="col-md">
          Title
          <SortEventsBtn
            handleSort={handleSortOwned}
            sortedElement="title_owned"
            currentCondition={state.sortConditionOwned}
          />
        </div>
        <div className="col-md">
          Date
          <SortEventsBtn
            handleSort={handleSortOwned}
            sortedElement="date_owned"
            currentCondition={state.sortConditionOwned}
          />
        </div>
        <div className="col-md">
          Time
          <SortEventsBtn
            handleSort={handleSortOwned}
            sortedElement="time_owned"
            currentCondition={state.sortConditionOwned}
          />
        </div>
      </div>
      {state.loading ? (
        <LoadingIcon />
      ) : (
        <FlipMove appearAnimation="elevator">
          {state.events_owned.sort(sortEventsOwned).map(event => {
            return (
              <div key={event.id}>
                <Event fetchEvents={fetchEvents} event={event} />
              </div>
            );
          })}
        </FlipMove>
      )}
      <div className="others"> Other events: </div>
      <div className="row header">
        <div className="col-md">
          Title
          <SortEventsBtn
            handleSort={handleSort}
            sortedElement="title"
            currentCondition={state.sortCondition}
          />
        </div>
        <div className="col-md">
          Date
          <SortEventsBtn
            handleSort={handleSort}
            sortedElement="date"
            currentCondition={state.sortCondition}
          />
        </div>
        <div className="col-md">
          Time
          <SortEventsBtn
            handleSort={handleSort}
            sortedElement="time"
            currentCondition={state.sortCondition}
          />
        </div>
      </div>
      {state.loading ? (
        <LoadingIcon />
      ) : (
        <FlipMove appearAnimation="elevator">
          {state.events.sort(sortEvents).map(event => {
            return (
              <div key={event.id}>
                <Event fetchEvents={fetchEvents} event={event} />
              </div>
            );
          })}
        </FlipMove>
      )}
    </>
  );
};

ReactDOM.render(<EventsList />, document.getElementById("events"));
