class GamesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
  before_action :authenticate_user!

  def new
    @game = Game.new
  end

  def index; end

  def show
    @game = Game.find(params[:id])
  end

  def create
    @game = Game.new(game_params)
    return render('new') unless @game.save

    redirect_to games_path
  end

  def edit
    @game = Game.find(params[:id])
  end

  def update
    @game = Game.find(params[:id])
    return render('edit') unless @game.update_attributes(game_params)

    redirect_to games_path
  end

  private

  def game_params
    if assign_category
      params.require(:game).permit(:title, :description, :global_rating, :game_guide, pictures: []).
        merge(category_id: assign_category.id, user_id: current_user.id)
    else
      params.require(:game).permit(:title, :description, :global_rating, :game_guide, pictures: []).
        merge(user_id: current_user.id)
    end
  end

  def assign_category
    Category.find_or_create_by(name: params[:game][:category]) unless params[:game][:category].strip.downcase == 'all'
  end

  def handle_record_not_found
    redirect_to games_path
  end
end
