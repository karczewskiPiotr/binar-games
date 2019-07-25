json.extract! game, :id, :title, :description, :global_rating
json.category game.category.name
unless game.pictures.attachments.size.zero?
  json.pictures(game.pictures) do |picture|
    json.url Rails.application.routes.url_helpers.rails_blob_path(picture, only_path: true)
  end
end
if game.game_guide.attached?
  json.guide Rails.application.routes.url_helpers.rails_blob_path(game.game_guide, only_path: true)
end
json.user do
  json.extract! game.user, :id, :nick, :email
  rating = Rating.find_by(rated_game_id: game.id, rating_user_id: current_user.id)
  json.rating rating.score unless rating.nil?
end
