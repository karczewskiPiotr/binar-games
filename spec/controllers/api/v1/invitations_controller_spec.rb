require 'rails_helper'

RSpec.describe Api::V1::InvitationsController, type: :controller do
  let!(:invite) { create(:invitation) }

  describe 'accept invite' do
    before { post :accept, params: { id: invite.id } }

    it { expect(invite.reload.status).to eq("accepted") }
  end

  describe 'decline invite' do
    before { post :decline, params: { id: invite.id } }

    it { expect(invite.reload.status).to eq("declined") }
  end
end