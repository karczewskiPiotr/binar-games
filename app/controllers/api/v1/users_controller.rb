class Api::V1::UsersController < ApiController
  def index
    @users = User.all
  end

  def current
    @user = current_user
    @events = Event.all
    @user_events = current_user.events
  end

  def following
    @followers = current_user.following
  end

  def follow
    @user = User.find(params[:user_id])
    current_user.follow(@user)
  end

  def unfollow
    @user = User.find(params[:user_id])
    current_user.unfollow(@user)
  end
end
