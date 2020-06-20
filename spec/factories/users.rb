FactoryBot.define do
  factory :user do
    name      {Faker::Games::Pokemon}
    email     {Faker::Internet.email}
    password  {"test1test1"}
    password_confirmation  {"test1test1"}
  end
end