require"rails_helper"
RSpec.describe Relationship, type:  :model do
 
  describe "relation with follower" do
    it { is_expected.to belong_to(:follower) }
end
describe "relation with followed" do
    it { is_expected.to belong_to(:followed) }
end
end
