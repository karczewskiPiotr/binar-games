class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one_attached :avatar
  validate :avatar_extension
  validates :nick, presence: true, uniqueness: true
  has_many :games
  has_many :organized_events, class_name: 'Event', foreign_key: 'owner_id'
  has_and_belongs_to_many :events

  private

  def avatar_extension
    if avatar.attached? && !avatar.content_type.in?(%w(image/jpeg image/png))
      avatar.purge
      errors.add(:avatar, 'must be a JPG or a PNG file.')
    end
  end
end
