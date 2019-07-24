class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def user_profile
    @user_profile = current_user
  end
end