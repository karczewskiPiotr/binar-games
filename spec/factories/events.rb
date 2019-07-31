FactoryBot.define do
    factory :event do
      game
      association :owner, factory: :user
      title { Faker::Lorem.characters(10) }
      description { Faker::Lorem.characters(23) }
      event_time { Faker::Time.between(DateTime.now - 1, DateTime.now) }
      event_date { Faker::Date.forward(23) } 
  end
end
