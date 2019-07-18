class Api::V1::GamesController < ApiController
  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end
end
