require 'rails_helper'

RSpec.describe Event, type: :model do
  let!(:user) { create(:user) }

    describe "attributes" do
      it { expect(subject.attributes).to include('title', 'description') }
    end

    describe "validation" do
      it { is_expected.to validate_presence_of(:title) }
      it { is_expected.to validate_presence_of(:description) }
      it { is_expected.to validate_presence_of(:event_time) }
      it { is_expected.to validate_presence_of(:event_date) }
      it { is_expected.to validate_length_of(:description).is_at_most(500) }
      it { is_expected.to validate_length_of(:title).is_at_most(35) }
    end

    describe "relations" do
      it { is_expected.to belong_to(:owner) }
      it { is_expected.to belong_to(:game) }
      it { is_expected.to have_many(:users).through(:invitations) }
    end
end
