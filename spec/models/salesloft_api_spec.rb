require 'rails_helper'

describe SalesloftApi do
  describe '#people' do
    before(:each) do
      @api = SalesloftApi.new
    end
    
    it 'returns the body of the api request' do
      expect(@api.people.class).to eq(Hash)
    end
  end
end