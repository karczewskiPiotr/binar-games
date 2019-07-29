require 'rails_helper'

RSpec.describe "/api/v1/users/index", type: :view do

    describe "GET #index" do
      let(:user1) { create(:user) }
      let(:user2) { create(:user) }
        before do
          @users = [user1, user2]
          render template: '/api/v1/users/index'
        end
        subject { JSON.parse(response)["data"] }
        describe 'correct response attributes' do
          it { expect(subject.size).to eq(2) }
  
          it 'check if all users are included' do
              @users.each_with_index do |user, index|
                  expect(subject[index]["id"]).to eq(user.id)
              end
          end
      end
        
    end
end