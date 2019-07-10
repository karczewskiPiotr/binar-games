class GamesController < ApplicationController
  def new
    @game = Game.new
  end

  def index
  end

  def show
    @game = Game.find(params[:id])
    render html: "Title: #{@game.title} Description: #{@game.description}"
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to @game
    else
      render 'new'
    end
  end

  private

  def game_params
    params.require(:game).permit(:title, :description, :rating)

  end
end
