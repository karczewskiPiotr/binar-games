import React from "react";
import Rating from "./Rating";
import ImageZoom from "react-medium-image-zoom";

const GameDetails = ({ game }) => {
  return (
    <div>
      <div className="game-details-wrapper">
        <div className="row">
          <div className="col-md description-wrapper">
            <div className="description-header">
              <h5>Description</h5>
            </div>
            <div className="description-content">{game.description}</div>
          </div>
          <div className="col-md-auto text-right user-rating-wrapper">
            <div className="user-rating-header">
              <h5>Your rating</h5>
            </div>
            <div className="rating">
              <Rating
                rating={game.user.rating}
                gameId={game.id}
                interactive={true}
              />
            </div>
          </div>
        </div>
        {game.pictures && (
          <>
            <div className="divider" />
            <div className="pictures-header">
              <h5>Pictures</h5>
            </div>
            <div className="row justify-content-start pictures">
              {game.pictures.map((picture, index) => {
                return (
                  <div key={index} className="col-md-auto text-center">
                    <ImageZoom
                      image={{
                        src: picture.url,
                        alt: `Game ${game.id} picture number ${index}`,
                        className: "picture-miniature",
                        style: { width: 128, height: 128 }
                      }}
                      zoomImage={{
                        src: picture.url,
                        alt: `Game ${game.id} picture number ${index} enlarged`
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
        {game.guide && (
          <>
            <div className="divider" />
            <div className="guide">
              <a href={game.guide} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pdf-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
                Open game guide
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameDetails;
