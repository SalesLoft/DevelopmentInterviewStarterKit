require 'rails_helper.rb'

describe SalesLoftApi do

  describe '#get_people' do
    it 'sends a get request' do
      expect(SalesLoftApi).to receive(:get).and_return(true)
      SalesLoftApi.get_people
    end
  end
end
