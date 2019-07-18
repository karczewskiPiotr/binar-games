class AddGameToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :games, :string
    add_index  :events, :game_id
  end
end
