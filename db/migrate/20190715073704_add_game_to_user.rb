class AddGameToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :user_id, :integer
    add_index  :games, :user_id
  end
end
