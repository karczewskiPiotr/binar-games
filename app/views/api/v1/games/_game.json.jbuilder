json.id game.id
json.title game.title
json.description game.description
json.category game.category.name
json.rating game.rating
unless game.pictures.attachments.size.zero?
  json.pictures(game.pictures) do |picture|
    json.url Rails.application.routes.url_helpers.rails_blob_path(picture, only_path: true)
  end
end
if game.game_guide.attached?
  json.guide Rails.application.routes.url_helpers.rails_blob_path(game.game_guide, only_path: true)
end
json.user game.user
