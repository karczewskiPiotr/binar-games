require 'rails_helper'

RSpec.describe User, type: :model do
    describe "attributes" do
        it { expect(subject.attributes).to include('email', 'nick') }
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
end
