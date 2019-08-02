class Invitation < ApplicationRecord
  belongs_to :user
  belongs_to :event

  enum status: %i[pending accepted declined]
end
