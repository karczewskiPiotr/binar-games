require 'rails_helper'

RSpec.describe GamesController, type: :controller do
    let(:user) { create(:user) }
    before { sign_in(user) }

    describe 'GET #index' do
        before { get :index }

        describe 'successful response' do
            it { expect(response).to be_successful }
            it { expect(response).to render_template('index') }
        end
    end

    describe 'GET #show' do
        let(:game) { create(:game, :with_attachments) }
        before { get :show, params: { id: game.id } }

        describe "successful response" do
            it { expect(response).to be_successful }
            it { expect(response).to render_template('show') }
        end

        context 'game' do
            it 'returns one game by given id' do
                expect(assigns(:game)).to eq(game)
            end
        end
    end

    describe 'GET #new' do
        before { get "new" }

        describe 'successful response' do
            it { expect(response).to be_successful }
            it { expect(response).to render_template('new') }
        end

        context "game" do
            it 'returns one game' do
                expect(assigns(:game)).to be_a(Game)
                expect(assigns(:game).persisted?).to eq(false)
            end
        end
    end

    describe 'GET #edit' do
        let(:game) { create(:game, :with_attachments) }
        before { get :edit, params: { id: game.id } }

        describe 'successful response' do
            it { expect(response).to be_successful }
            it { expect(response).to render_template('edit') }
        end

        context 'game' do
            it 'returns one game by given id' do
                expect(assigns(:game)).to eq(game)
            end
        end
    end

    describe 'POST #create' do
        let(:valid_attributes) { { game: attributes_for(:game).merge(category: Faker::Lorem.characters(9)) } }
        let(:invalid_attributes) { { game: attributes_for(:game, title: Faker::Lorem.characters(40)).merge(category: Faker::Lorem.characters(9)) } }

        context 'valid attributes' do
            subject { post :create, params: valid_attributes }

            it { expect(subject).to redirect_to(Game.last) }
            
            it { expect { subject }.to change(Game, :count).by(1) }
        end

        context 'invalid attributes' do
            subject { post :create, params: invalid_attributes } 

            it { expect(subject).to render_template('new') }
            it { expect { subject }.not_to change(Game, :count) }
        end
    end

    describe 'PUT #update' do
        let(:game) { create(:game, :with_attachments) }
        let(:valid_attributes) { { id: game.id, game: attributes_for(:game).merge(category: Faker::Lorem.characters(9)) } }
        let(:invalid_attributes) { { id: game.id, game: attributes_for(:game, title: Faker::Lorem.characters(40)).merge(category: Faker::Lorem.characters(9)) } }

        context 'valid attributes' do
            subject { put :update, params: valid_attributes }
      
            it { expect(subject).to redirect_to(game) }
      
            it 'updates game' do
              subject
              expect(game.reload.title).to eq(valid_attributes[:game][:title])
            end
          end
      
          context 'invalid attributes' do
            subject { put :update, params: invalid_attributes }
      
            it { expect(subject).to render_template('edit') }
            it { expect { subject }.not_to change(game, :title) }
          end
    end
end