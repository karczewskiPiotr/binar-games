class GamesController < ApplicationController
  def new
    @game = Game.new
  end

  def index
    @games = Game.all
  end

  def show
    @game = current_game
  end

  def create
    @game = Game.new(game_params)
    @game.category = assign_category
    @game.user = current_user
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

  def assign_category
    category = Category.new(name: params[:game][:category])
    if category.save
      category
    else
      category.name
      Category.find_by name: params[:game][:category]
    end
  end

  def current_game
    Game.find(params[:id])
  end
end
