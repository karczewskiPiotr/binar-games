json.data do
  json.extract! @user, :id, :nick, :points, :organized_events
  json.avatar Rails.application.routes.url_helpers.rails_blob_path(@user.avatar, only_path: true) if @user.avatar.attached?
end