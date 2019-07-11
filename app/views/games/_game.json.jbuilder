json.extract! game, :id, :title, :description, :rating, :created_at, :updated_at
json.pictures (game.pictures) do |picture|
    json.picture_url Rails.application.routes.url_helpers.rails_blob_path(picture, only_path: true)
end
json.url game_url(game, format: :json)


