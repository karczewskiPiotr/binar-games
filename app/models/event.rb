class Event < ApplicationRecord
  belongs_to :game
  belongs_to :owner, class_name: 'User'
  has_and_belongs_to_many :users
  validates :title, length: { minimum: 2, maximum: 35 }, presence: true
  validates :description, length: { maximum: 500 }, presence: true
  validates :game, presence: true
  validates :event_time, presence: true
  validates :event_date, presence: true
end
