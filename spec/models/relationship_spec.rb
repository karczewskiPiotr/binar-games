require"rails_helper"
RSpec.describe Relationship, type:  :model do
 
  describe "relation1" do
    it { is_expected.to belong_to(:follower) }
end
describe "relation2" do
    it { is_expected.to belong_to(:followed) }
end
end
