require 'rails_helper'

describe SalesloftApi do
  before(:each) do
    @api = SalesloftApi.new
  end

  describe '#people' do
    before(:each) do
      stub_request(:get, 'https://api.salesloft.com/v2/people').
        with(headers:{Authorization: "Bearer #{ENV['SALESLOFT_API_KEY']}"}).
        to_return(status: 200, body: '["people"]', headers: {})
    end

    it 'returns the body of the api request' do
      expect(@api.people).to eq(['people'])
    end
  end
end