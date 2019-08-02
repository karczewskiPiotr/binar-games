class ApiController < ActionController::API
  before_action :authenticate_user!
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  private

  def handle_record_not_found
    render json: { error: "Game with id #{params[:id]} does not exist" }, status: :unprocessable_entity
  end
end
