class GamesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

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
      return render 'new' unless @game.save

      redirect_to @game
    end
  end

  def edit
    @game = Game.find(params[:id])
  end

  def update
    @game = Game.find(params[:id])
      return render 'edit' unless @game.update_attributes(game_params)

      redirect_to @game
    end
  end

  private

  def game_params
    params.require(:game).permit(:title, :description, :rating, :game_guide, pictures: []).merge({ category: assign_category, user: current_user })
  end

  def assign_category
    category = Category.new(name: params[:game][:category])
    return Category.find_by(name: params[:game][:category]) unless category.save
    
    category
  end

  def handle_record_not_found
      redirect_to games_path
  end
end
