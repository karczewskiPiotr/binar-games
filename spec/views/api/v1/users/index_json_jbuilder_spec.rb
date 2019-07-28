require 'rails_helper'

RSpec.describe "/api/v1/users/index", type: :view do

    describe "GET #index" do
        before do
          get :index
        end

        it "returns http success" do
            expect(response).to have_http_status(:success)
          end
    end
end