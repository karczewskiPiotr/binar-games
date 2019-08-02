json.data do
  json.array! @users do |user|
    json.extract! user, :id, :nick, :points
    json.rank User.order(points: :desc).index(user) + 1
  end
end
