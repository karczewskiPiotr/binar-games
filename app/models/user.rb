class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]
  has_one_attached :avatar
  validate :avatar_extension
  validates :nick, presence: true, uniqueness: true
  has_many :games
  has_many :organized_events, class_name: 'Event', foreign_key: 'owner_id'
  has_and_belongs_to_many :events
  has_many :active_relationships, class_name: 'Relationship', foreign_key: 'follower_id', dependent: :destroy
  has_many :passive_relationships, class_name: 'Relationship', foreign_key: 'followed_id', dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower

  def self.from_omniauth(auth)
    where(email: auth.info['email']).first_or_create do |user|
      user.email = auth.info['email']
      user.nick = auth.info['email'].delete_suffix('@gmail.com')
      user.password = "from_google"
      user.token = auth.credentials.token
      user.expires = auth.credentials.expires
      user.expires_at = auth.credentials.expires_at
      user.refresh_token = auth.credentials.refresh_token
    end
  end

  def follow(other_user)
    following << other_user
  end

  def unfollow(other_user)
    following.destroy(other_user)
  end

  def following?(other_user)
    following.include?(other_user)
  end
  has_many :ratings, foreign_key: 'rating_user_id'
  has_many :rated_games, through: :ratings, class_name: 'Game', foreign_key: 'rated_game_id'

  private

  def avatar_extension
    return unless avatar.attached? && !avatar.content_type.in?(%w[image/jpeg image/png])

    avatar.purge
    errors.add(:avatar, 'must be a JPG or a PNG file.')
  end
end
