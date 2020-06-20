require 'rails_helper'
describe Message do
  context "#create" do
    it "メッセージがあれば保存できる" do
      message = build(:message, image: nil)
      expect(message).to be_valid
    end

    it "画像があれば保存できる" do
      message = build(:message, content: nil)
      expect(message).to be_valid
    end

    it "メッセージと画像があれば保存できる" do
      message = build(:message)
      expect(message).to be_valid
    end
  end

  context "保存できない" do
    it "メッセージも画像もないと保存できない" do
      message = build(:message, content: nil, image: nil)
      message.valid?
      expect(message.errors[:content]).to include("を入力してください")
    end

    it "group_idが無いと保存できない" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end

    it "user_idが無いと保存できない" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
  end
end