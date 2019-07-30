require 'rails_helper'

RSpec.describe UsersController, type: :controller do
    describe 'GET #show' do
        let(:user) { create(:user) }
        before { get :show, params: { id: user.id } }

        describe "successful response" do
            it { expect(response).to be_successful }
            it { expect(response).to render_template('show') }
        end

        context 'user' do
            it 'returns one user by given id' do
                expect(assigns(:user)).to eq(user)
            end
        end
    end
end
