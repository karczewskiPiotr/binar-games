class Api::V1::CategoriesController < ActionController::API
  def index
    @categories = Category.all
  end

  def show
    @category = Category.find(params[:id])
  end
end
