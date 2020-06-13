class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  varidates :content, presence: true, unless: :image?
end
