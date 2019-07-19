class CreateEventsUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :events_users do |t|
      t.integer :user_id, index: true
      t.integer :event_id, index: true
    end
  end
end
