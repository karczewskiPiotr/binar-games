require 'rails_helper'

RSpec.describe Api::V1::InvitationsController, type: :controller do
  let!(:invite) { create(:invitation) }
  let(:user) { create(:user) }

  describe 'accept invite' do
    before do
      sign_in(user)
      post :accept, params: { id: invite.id }
    end

    it { expect(invite.reload.status).to eq("accepted") }
  end

  describe 'decline invite' do
    before do
      sign_in(user)
      post :decline, params: { id: invite.id } 
    end

    it { expect(invite.reload.status).to eq("declined") }
  end
end