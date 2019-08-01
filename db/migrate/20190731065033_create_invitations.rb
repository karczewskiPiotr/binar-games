class CreateInvitations < ActiveRecord::Migration[5.2]
  def change
    create_table :invitations do |t|
      t.integer :user_id, index: true
      t.integer :event_id, index: true
      t.integer :status, default: 0
      t.timestamps
    end
  end
end
