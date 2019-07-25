class Rating < ApplicationRecord
  belongs_to :rated_game, class_name: 'Game', foreign_key: 'rated_game_id'
  belongs_to :rating_user, class_name: 'User', foreign_key: 'rating_user_id'
end
