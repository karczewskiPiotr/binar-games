FactoryBot.define do
    factory :user do
      nick { Faker::DcComics.hero }
      email { Faker::Internet.email }
      password { Faker::Internet.password(6) }

      trait :with_avatar do
        after(:build) do |user|
          user.avatar.attach(io: File.open('spec/files/images/avatar.png'), filename: 'attachment.png', content_type: 'image/png')
        end
      end
    end
  end