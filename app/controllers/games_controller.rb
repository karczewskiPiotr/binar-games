class GamesController < ApplicationController
  def new
    @game = Game.new
  end

  def index
  end

  def show
    @game = Game.find(params[:id])
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to @game
    else
      # redirect_to new_game_path
      render 'new'
    end
  end

  private

  def game_params
    params.require(:game).permit(:title, :description, :rating, :game_guide, pictures: [])

  end
end
