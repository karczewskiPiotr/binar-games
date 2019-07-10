class AddNickToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :nick, :string
  end
end
