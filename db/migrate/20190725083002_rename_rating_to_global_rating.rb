class RenameRatingToGlobalRating < ActiveRecord::Migration[5.2]
  def change
    rename_column :games, :rating, :global_rating
  end
end
