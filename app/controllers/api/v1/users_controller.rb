class Api::V1::UsersController < ApiController
  def index
    @users = User.all
  end

  def current
    @user = current_user
    @events = Event.all
    @user_events = current_user.events
  end
end
