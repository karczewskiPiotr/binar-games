FactoryBot.define do
    factory :category do
        name { Faker::Lorem.characters(7) }
    end
end