json.data do
  json.extract! @user, :id, :nick, :points
  json.events do
    json.array!(@user_events) do |event|
      json.extract! event, :title, :event_date, :event_time, :id
    end
  end
  json.org_events do
    json.array!(@take_events) do |event|
      json.extract! event, :title, :event_date, :event_time, :id
    end
  end
  json.user_games do
    json.array!(@user_games) do |game|
      json.extract! game, :title
    end
  end
  json.user_followers do
    json.array!(@user_followers) do |follower|
      json.extract! follower, :id
    end
  end
  if @user.avatar.attached?
    json.avatar Rails.application.routes.url_helpers.rails_blob_path(@user.avatar, only_path: true)
  end
end
