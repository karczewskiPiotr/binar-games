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
  has_many :active_relationships, class_name: 'Relationship', foreign_key: 'follower_id', dependent: :destroy
  has_many :passive_relationships, class_name: 'Relationship', foreign_key: 'followed_id', dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower

  def follow(other_user)
    following << other_user
  end

  def unfollow(other_user)
    following.delete(other_user)
  end

  def following?(other_user)
    following.include?(other_user)
  end

  private

  def avatar_extension
    return unless avatar.attached? && !avatar.content_type.in?(%w[image/jpeg image/png])

    avatar.purge
    errors.add(:avatar, 'must be a JPG or a PNG file.')
  end
end
