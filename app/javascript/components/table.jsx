import React from 'react';
import logo from "../../../serduszeczko.svg";


export default function Table(props) {
    return (
          <div className = 'listDiv' > 
            <div className = 'bg'>
              <table className = 'table placek' >
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Nick</th>
                    <th>Points</th>
                    <th>Fav</th>
                  </tr> 
                </thead>
                <tbody>
                  {
                    props.usersData.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.nick}</td>
                        <td>{row.points}</td>
                        <td>
                          serce
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
            )
          }
