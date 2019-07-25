class CreateRatingsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :ratings do |t|
      t.integer :rated_game_id, index: true
      t.integer :rating_user_id, index: true
      t.integer :score, default: 0
      t.timestamps
    end
  end
end
