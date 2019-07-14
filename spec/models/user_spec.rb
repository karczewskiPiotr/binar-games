require 'rails_helper'

RSpec.describe User, type: :model do
    describe "attributes" do
        it { expect(subject.attributes).to include('email', 'nick') }
    end

    describe "validation" do
        it { is_expected.to validate_presence_of(:nick) }
        it { is_expected.to validate_presence_of(:email) }
    end
end
