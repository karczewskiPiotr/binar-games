class GamesController < ApplicationController
  def new
    @game = Game.new
  end

  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to @game
    else
      render 'new'
    end
  end

  def edit
    @game = current_game
  end

  def update
    @game = current_game
    if @game.update_attributes(game_params)
      redirect_to @game
    else
      render 'edit'
    end
  end

  private

  def game_params
    params.require(:game).permit(:title, :description, :rating, :game_guide, pictures: [])
  end

  def current_game
    Game.find(params[:id])
  end
end
