require 'rails_helper'

RSpec.describe "/api/v1/games/index", type: :view do
    let(:game1) { create(:game, :with_attachments) }
    let(:game2) { create(:game, :with_attachments) }
    let(:user) { create(:user) }
    before do
        sign_in(user)
        @games = [game1, game2]
        render template: '/api/v1/games/index'
    end

    subject { JSON.parse(response)["data"] }

    describe 'correct response attributes' do
        it { expect(subject.size).to eq(2) }

        it 'check if all games are included' do
            @games.each_with_index do |game, index|
                expect(subject[index]["id"]).to eq(game.id)
            end
        end
    end
end
