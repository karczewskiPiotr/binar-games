class AddPoinsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :points, :float
  end
end
