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
        before { get :new }
    
        describe 'successful response' do
          it { expect(response).to be_successful }
          it { expect(response).to render_template('new') }
        end
    
      context 'event' do
          it 'returns one event by given id' do
            expect(assigns(:owner)).to be_a(Owner)
            expect(assigns(:owner).persisted?).to eq(false)
          end
        end
      end

end
