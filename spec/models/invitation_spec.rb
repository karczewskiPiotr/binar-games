require 'rails_helper'

RSpec.describe Invitation, type: :model do
  describe "relations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:event) }
  end

  describe "attributes" do
    it { expect(subject.attributes).to include('user_id', 'event_id', 'status') }
  end

  describe "enum" do
    it { is_expected.to define_enum_for(:status) }
  end
  
end
