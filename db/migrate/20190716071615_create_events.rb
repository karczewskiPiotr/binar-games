class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.time :event_time
      t.date :event_date
      t.timestamps
    end
  end
end
