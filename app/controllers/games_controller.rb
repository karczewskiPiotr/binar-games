class GamesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

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
    respond_to do |format|
      if @game.save
        format.html { redirect_to @game }
        format.json { render :show, status: :created, location: @game }
      else
        format.html { render 'new' }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @game = current_game
  end

  def update
    @game = current_game
    respond_to do |format|
      if @game.update_attributes(game_params)
        format.html { redirect_to @game }
        format.json { render :show, status: :ok, location: @game }
      else
        format.html { render 'edit' }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def game_params
    params.require(:game).permit(:title, :description, :rating, :game_guide, pictures: []).merge({ category: assign_category, user: current_user })
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

  def handle_record_not_found
    respond_to do |format|
      format.html { redirect_to games_path }
      format.json { render json: { error: "Game with id #{params[:id]} does not exist" }, status: :unprocessable_entity }
    end
  end
end
