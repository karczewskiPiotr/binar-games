class Game < ApplicationRecord
    has_many_attached :pictures
    has_one_attached :game_guide

    validates :title, presence: true, length: { maximum: 35 }
    validates :description, presence: true, length: {maximum: 255}
    validates_inclusion_of :rating, in: 1..10
    validate :correct_picture_mime_type
    validate :correct_game_guide_mime_type

    private

    def correct_picture_mime_type
        return unless pictures.attached?

        pictures.each do |picture|
            unless picture.content_type.in?(%w(image/jpeg image/png))
                picture.purge
                errors.add(:picture, 'Must be a JPG or a PNG file')
            end
        end
    end

    def correct_game_guide_mime_type
        if game_guide.attached? && !game_guide.content_type.in?(%w(application/pdf application/msdoc))
            game_guide.purge
            errors.add(:game_guide, 'Must be a PDF or DOC file')
        end
    end
end
