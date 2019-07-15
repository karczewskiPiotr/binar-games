require 'rails_helper'

RSpec.describe Game, type: :model do
    let!(:user) { create(:user) }

    describe "attributes" do
        it { expect(subject.attributes).to include('title', 'description', 'rating') }
    end

    describe "validation" do
        it { is_expected.to validate_presence_of(:title) }
        it { is_expected.to validate_length_of(:title).is_at_most(35) }
        it { is_expected.to validate_presence_of(:description) }
        it { is_expected.to validate_length_of(:description).is_at_most(255) }
    end

    describe "relations" do
        it { is_expected.to belong_to(:category) }
    end
    

    describe 'attachments' do
        let(:game1) { create(:game, :with_attachments)}
        let(:game2) { create(:game) }

        it { expect(game1).to be_valid }

        it 'have correct extension' do
            game2.game_guide.attach(io: File.open('spec/files/images/avatar.png'), filename: 'attachment.png', content_type: 'image/png')
            game2.pictures.attach(io: File.open('spec/files/documents/dummy.pdf'), filename: 'attachment.pdf', content_type: 'application/pdf')
            expect(game2).not_to be_valid
        end

        context 'pictures' do
            it 'have maximum number of 5' do
                6.times do                    
                    game2.pictures.attach(io: File.open('spec/files/images/avatar.png'), filename: 'attachment.png', content_type: 'image/png')
                end
                expect(game2).not_to be_valid                
            end
        end
    end
end
