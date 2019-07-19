FactoryBot.define do
    factory :game do
        user
        title { Faker::Lorem.characters(10) }
        description { Faker::Lorem.characters(23) }
        category

        trait :with_attachments do
            after(:build) do |game|
                5.times do
                    game.pictures.attach(io: File.open('spec/files/images/avatar.png'), filename: 'attachment.png', content_type: 'image/png')
                end
                game.game_guide.attach(io: File.open('spec/files/documents/dummy.pdf'), filename: 'attachment.pdf', content_type: 'application/pdf')
            end
        end
    end
end