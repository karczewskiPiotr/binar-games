json.data do
  json.extract! @user, :id, :nick, :points, :organized_events
  json.events do
    json.array! (@user_events) do |event| 
      json.extract! event, :title
    end
  end
  if @user.avatar.attached?
    json.avatar Rails.application.routes.url_helpers.rails_blob_path(@user.avatar, only_path: true)
  end
end
