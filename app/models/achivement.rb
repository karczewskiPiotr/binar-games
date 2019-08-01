class Achivement < ApplicationRecord
  belongs_to :event
  validates :name, length: { maximum: 35 }, presence: :true

end