import React from 'react';

export default function Table(props) {
    return (
          <div className = 'listDiv' > 
            <div className = 'bg'>
              <table className = 'table' >
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Nick</th>
                    <th>Points</th>
                  </tr> 
                </thead>
                <tbody>
                  {
                    props.usersData.map(row => (
                      <tr>
                        <td>{row.id}</td>
                        <td>{row.nick}</td>
                        <td>{row.points}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
            )
          }
