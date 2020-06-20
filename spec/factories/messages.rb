FactoryBot.define do
  factory :message do
    content   {Faker::Coffee.blend_name}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    user
    group
  end
end