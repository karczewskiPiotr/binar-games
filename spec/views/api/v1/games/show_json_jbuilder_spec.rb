require 'rails_helper'

RSpec.describe "/api/v1/games/index", type: :view do
    let(:game) { create(:game, :with_attachments) }
    let(:user) { create(:user) }
    before do
        allow(view).to receive(:current_user).and_return(user)
        @game = game
        render template: '/api/v1/games/show'
    end

    subject { JSON.parse(response)["data"] }

    describe 'correct response attributes' do
        it { expect(subject.keys).to match_array(["id", "title", "description", "category", "global_rating", "pictures", "guide", "user"]) }
        it { expect(subject["id"]).to eq(@game.id)}
        it { expect(subject["title"]).to eq(@game.title)}
        it { expect(subject["description"]).to eq(@game.description)}
        it { expect(subject["global_rating"]).to eq(@game.global_rating)}
        it { expect(subject["category"]).to eq(@game.category.name)}
        it { expect(subject["user"]["id"]).to eq(@game.user.id)}
        it { expect(subject["guide"]).to eq(Rails.application.routes.url_helpers.rails_blob_path(game.game_guide, only_path: true))}
        it { expect(subject["pictures"][0]["url"]).to eq(Rails.application.routes.url_helpers.rails_blob_path(game.pictures.first, only_path: true)) }
    end
end
