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
  has_many :ratings, foreign_key: 'rating_user_id'
  has_many :rated_games, through: :ratings, class_name: 'Game', foreign_key: 'rated_game_id'

  private

  def avatar_extension
    return unless avatar.attached? && !avatar.content_type.in?(%w[image/jpeg image/png])

    avatar.purge
    errors.add(:avatar, 'must be a JPG or a PNG file.')
  end
end
