class Api::V1::UsersController < ApiController
  def index
    @users = User.where.not(id: current_user.id)
  end

  def current
    start_month = Date.today.beginning_of_month
    end_month = start_month.end_of_month
    @user_games = Game.all
    @user = current_user
    @take_events = current_user.organized_events.where(created_at: start_month..end_month).order(event_time: 'DESC')
    @user_events = current_user.events.where(created_at: start_month..end_month).order(event_time: 'DESC')
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
