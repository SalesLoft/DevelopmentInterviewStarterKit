require 'rails_helper'

describe SalesloftApi do
  let(:api) { SalesloftApi.new }

  describe '#people' do
    it 'returns the body of the api request' do
      expected_result = JSON.parse(fake_salesloft_people)
      expect(api.people).to eq(expected_result)
    end
  end
end