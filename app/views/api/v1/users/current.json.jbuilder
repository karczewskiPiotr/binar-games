json.data do
  json.extract! @user, :id, :nick
  json.avatar Rails.application.routes.url_helpers.rails_blob_path(@user.avatar, only_path: true) if @user.avatar.attached?
end