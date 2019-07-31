class Api::V1::UsersController < ApiController
  def index
    @users = User.all
  end

  def current
    beginning_of_month = Date.today.beginning_of_month
    end_of_month = beginning_of_month.end_of_month

    @user = current_user
    @take_part_events = current_user.organized_events.where(event_date: beginning_of_month..end_of_month)
    @user_events = current_user.events.where(event_date: beginning_of_month..end_of_month)
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
