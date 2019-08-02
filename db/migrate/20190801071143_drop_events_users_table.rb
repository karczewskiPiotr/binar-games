class DropEventsUsersTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :events_users
  end
end
