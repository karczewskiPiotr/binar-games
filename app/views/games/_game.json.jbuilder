json.id game.id
json.user game.user.id
json.title game.title
json.description game.description
json.category game.category.name
json.rating game.rating
json.pictures (game.pictures) do |picture|
    json.picture_url Rails.application.routes.url_helpers.rails_blob_path(picture, only_path: true)
end
json.guide Rails.application.routes.url_helpers.rails_blob_path(game.game_guide, only_path: true)
json.created_at game.created_at
json.updated_at game.updated_at


json.url game_url(game, format: :json)


