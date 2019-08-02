require 'rails_helper'

RSpec.describe "/api/v1/invitations/index", type: :view do
  let!(:invite1) { create(:invitation) }
  let!(:invite2) { create(:invitation) }
  let(:user) { create(:user) }

  before do
      sign_in(user)
      @invitations = [invite1, invite2]
      render template: '/api/v1/invitations/index'
  end

  subject { JSON.parse(response)["data"] }

  describe 'correct response attributes' do
      it { expect(subject.size).to eq(2) }

      it 'check if all invitaations are included' do
          @invitations.each_with_index do |invite, index|
              expect(subject[index]["id"]).to eq(invite.id)
          end
      end
  end
end
