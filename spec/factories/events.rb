

FactoryBot.define do
  factory :event do
    title { fake.text(max_nb_chars=100, ext_word_list=None) }
    description { fake.text(max_nb_chars=200, ext_word_list=None) }
    event_time { fake.time(pattern="%H:%M:%S", end_datetime=None) }
    event_date { fake.date(pattern="%Y-%m-%d", end_datetime=None) }
  end
end
