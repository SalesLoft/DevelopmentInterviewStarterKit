require 'rails_helper'

describe Person do
  describe ".all" do
    it 'returns a list of all people' do
      expected_result = JSON.parse(fake_salesloft_people)['data']
      expect(Person.all).to eq(expected_result)
    end
  end
end