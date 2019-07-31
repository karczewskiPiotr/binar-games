require 'rails_helper'

RSpec.describe User, type: :model do
    describe "attributes" do
        it { expect(subject.attributes).to include('email', 'nick') }
    end

    describe "relations" do
      it { is_expected.to have_many(:games) }
      it { is_expected.to have_many(:organized_events) }
      it { is_expected.to have_many(:active_relationships) }
      it { is_expected.to have_many(:passive_relationships) }
      it { is_expected.to have_many(:following) }
      it { is_expected.to have_many(:followers) }
      it { is_expected.to have_many(:ratings) }
      it { is_expected.to have_many(:rated_games) }
      it { is_expected.to have_many(:invitations) }
      it { is_expected.to have_many(:events).through(:invitations) } 
    end
    

    describe "validation" do
        it { is_expected.to validate_presence_of(:nick) }
        it { is_expected.to validate_uniqueness_of(:nick) }
        it { is_expected.to validate_presence_of(:email) }
    end

    describe 'attachment' do
        let(:user1) { create(:user, :with_avatar) }
        let(:user2) { create(:user) }

        it { expect(user1.avatar).to be_attached }

        it 'has correct extension' do
            user2.avatar.attach(io: File.open('spec/files/documents/dummy.pdf'), filename: 'attachment.pdf', content_type: 'application/pdf')
            expect(user2).not_to be_valid
        end
      end

    describe 'utility' do
          let(:user1) { create(:user) }
          let(:user2) { create(:user) }
        
        it("should follow a user") do
          expect(user1.following?(user2)).to eq(false)
          user1.follow(user2)
          expect(user1.following?(user2)).to eq(true)
        end

        it ("should unfollow a user") do
          user1.follow(user2)
          expect(user2.followers.include?(user1)).to eq(true)
          user1.unfollow(user2)
          expect(user1.following?(user2)).to eq(false)
        end
      end
end
