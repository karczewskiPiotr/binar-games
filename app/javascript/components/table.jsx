import React from "react";

export default function Table(props) {
  return (
    <div className="listDiv">
      <div className="bg">
        <table className="topnavbar table">
          <thead className="tab_head">
            <tr>
              <th />
              <th>Nick</th>
              <th>Points</th>
              <th>Fav</th>
            </tr>
          </thead>
          <tbody>
            {props.usersData.map(tab_row => (
              <tr key={tab_row.id}>
                <td>{tab_row.id}</td>
                <td>{tab_row.nick}</td>
                <td>{tab_row.points}</td>
                <td>serce</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
