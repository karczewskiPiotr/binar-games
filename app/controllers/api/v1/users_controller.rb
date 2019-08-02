class Api::V1::UsersController < ApiController
  def index
    @users = User.all
  end

  def current
    start_month = Date.today.beginning_of_month
    end_month = start_month.end_of_month
    @user_games = current_user.games
    @user = current_user
    @take_events = current_user.organized_events.where(created_at: start_month..end_month).order(event_time: 'DESC')
    @user_events = current_user.events.where(created_at: start_month..end_month).order(event_time: 'DESC')
    @rank = User.order(points: :desc).index(current_user) + 1
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
