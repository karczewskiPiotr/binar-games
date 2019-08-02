class AddFinalisedToEventsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :finalised, :boolean, default: false
  end
end
