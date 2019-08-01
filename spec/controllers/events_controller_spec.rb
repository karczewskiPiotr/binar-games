require 'rails_helper'

RSpec.describe EventsController, type: :controller do
    let(:user) { create(:user) }
    before { sign_in(user) }

    describe 'GET #index' do
        before { get :index }

        describe 'successful response' do
            it { expect(response).to be_successful }
            it { expect(response).to render_template('index') }
        end
    end

    describe 'GET #new' do
        before { get "new" }

        describe 'successful response' do
            it { expect(response).to be_successful }
            it { expect(response).to render_template('new') }
        end

        context "event" do
            it 'returns one event' do
                expect(assigns(:event)).to be_a(Event)
                expect(assigns(:event).persisted?).to eq(false)
            end
        end
    end

    describe 'POST #create' do
        let(:user) { create(:user) }
        before { sign_in(user) }
        let(:game) { create(:game)}
        let(:valid_attributes) { { event: { 
            title: 'czosnek', 
            description: "cebula", 
            event_time: "2000-01-01 12:02:00", 
            event_date: "2321-03-12", 
            private: false, 
            game: game.title } } }

        let(:invalid_attributes) { { event: { 
            title: "", 
            description: '', 
            event_time: '', 
            event_date: '', 
            private: '', 
            game: game.title } } }
       
        context 'valid attributes' do
            subject { post :create, params: valid_attributes }

            it { expect(subject).to redirect_to(Event.last) }
            
            it { expect { subject }.to change(Event, :count).by(1) }
        end

        context 'invalid attributes' do
            subject { post :create, params: invalid_attributes } 

            it { expect(subject).to render_template('new') }
            it { expect { subject }.not_to change(Event, :count) }
        end
    end
end
