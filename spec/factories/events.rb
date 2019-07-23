FactoryBot.define do
  factory :event do
    title {"MyTitle"}
    description { "MyText" }
    event_time { "2019-07-16 09:16:15" }
    event_date { "2019-07-16" }
    game
  end
end
