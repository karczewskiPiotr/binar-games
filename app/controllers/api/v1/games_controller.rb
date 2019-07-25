class Api::V1::GamesController < ApiController
  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end

  def update
    game = Game.find(params[:id])
    rating = Rating.find_or_create_by(rated_game_id: game.id, rating_user_id: current_user.id)
    return render json: { errors: rating.errors.full_messages }, status: :unprocessable_entity unless rating.
      update(score: params[:rating])

    return render json: { errors: game.errors.full_messages }, status: :unprocessable_entity unless game.
      update(global_rating: Rating.where(rated_game_id: game.id).average(:score).to_i)
  end
end
