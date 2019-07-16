class Api::V1::GamesController < ApiController
    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

    def index
      @games = Game.all
    end

    def show
      @game = Game.find(params[:id])
    end

    private
  
    def handle_record_not_found
        render json: { error: "Game with id #{params[:id]} does not exist" }, status: :unprocessable_entity
    end
  end
  