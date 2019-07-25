json.extract! event, :id, :title, :description, :event_date, :private, :owner_id
json.event_time event.event_time.to_formatted_s(:time)
json.is_owner event.owner_id === current_user.id
json.game do
    json.partial! 'api/v1/games/game', game: event.game
end