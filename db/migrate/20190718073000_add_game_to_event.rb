class AddGameToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :game_id, :int
    add_index  :events, :game_id
  end
end
