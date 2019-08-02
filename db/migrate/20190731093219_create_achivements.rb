class CreateAchivements < ActiveRecord::Migration[5.2]
  def change
    create_table :achivements do |t|
      t.string :name
      t.integer :event_id, index: true
      t.timestamps
      
    end
  end
end
