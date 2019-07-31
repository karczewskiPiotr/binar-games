FactoryBot.define do 
  factory :invitation do
    user
    event
    status { 0 }
  end
end