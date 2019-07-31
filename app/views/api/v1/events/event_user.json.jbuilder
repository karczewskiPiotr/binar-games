json.data do
  json.array! @event.users do |user|
    json.extract! user, :nick
  end
end