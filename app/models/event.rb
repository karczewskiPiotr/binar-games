class Event < ApplicationRecord
    belongs_to :owner, class_name: 'User'
    has_and_belongs_to_many :users
    validates :title, length: { minimum: 2 }
    validates :description, length: { maximum: 500 }
end