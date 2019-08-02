class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(current_user.id)
    return render 'devise/registrations/edit' unless @user.update_attributes(user_params)

    bypass_sign_in @user
    redirect_to users_path
  end

  private

  def user_params
    new_params = params.require(:user).permit(:nick, :email, :password, :password_confirmation, :id, :avatar)
    if params[:password] || params[:password_confirmation]
      new_params
    else
      new_params.slice(:nick, :email, :id, :avatar)
    end
  end
end
