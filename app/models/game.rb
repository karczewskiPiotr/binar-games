class Game < ApplicationRecord
    validates :title, presence: true, length: { maximum: 35 }
    validates :description, presence: true, length: {maximum: 255}
end
