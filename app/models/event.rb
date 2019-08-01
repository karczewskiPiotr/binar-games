class Event < ApplicationRecord
  belongs_to :game
  belongs_to :owner, class_name: 'User'

  has_many :invitations
  has_many :users, through: :invitations
  has_many :achivements

  validates :title, length: { minimum: 2, maximum: 35 }, presence: true
  validates :description, length: { maximum: 500 }, presence: true
  validates :game, presence: true
  validates :event_time, presence: true
  validates :event_date, presence: true
end
