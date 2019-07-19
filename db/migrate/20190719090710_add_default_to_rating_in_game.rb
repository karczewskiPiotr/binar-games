class AddDefaultToRatingInGame < ActiveRecord::Migration[5.2]
  def change
    change_column_default :games, :rating, 0
  end
end
