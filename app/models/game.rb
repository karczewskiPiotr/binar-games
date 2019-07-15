class Game < ApplicationRecord
    has_many_attached :pictures
    has_one_attached :game_guide
    belongs_to :category
    belongs_to :user

    validates :title, presence: true, length: { maximum: 35 }
    validates :description, presence: true, length: {maximum: 255}
    validate :pictures_amount_ng_than_five
    validate :pictures_extensions
    validate :guide_extension

    private

    def pictures_extensions
        pictures.each do |picture|
            unless picture.content_type.in?(%w(image/jpeg image/png))
                picture.purge
                errors.add(:pictures, 'must be a JPG or a PNG file.')
            end
        end
    end

    def guide_extension
        if game_guide.attached? && !game_guide.content_type.in?(%w(application/pdf application/msdoc))
            game_guide.purge
            errors.add(:game_guide, 'must be a PDF or DOC file.')
        end
    end

    def pictures_amount_ng_than_five
        if  pictures.attachments.size > 5
            pictures.purge
            errors.add(:pictures, "can not be more than 5.")
        end
    end
end
