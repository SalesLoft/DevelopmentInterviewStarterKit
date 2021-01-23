require 'rails_helper'

describe SalesloftApi do
  before(:each) do
    @api = SalesloftApi.new
  end

  describe '#people' do
    before(:each) do
      stub_salesloft_people
    end

    it 'returns the body of the api request' do
      expect(@api.people).to eq(JSON.parse(fake_salesloft_people))
    end
  end
end