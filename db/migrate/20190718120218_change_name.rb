class ChangeName < ActiveRecord::Migration[5.2]
  def change
    rename_column :events, :user_id, :owner_id
  end
end
