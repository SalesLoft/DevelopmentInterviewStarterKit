require 'rails_helper.rb'

describe SalesLoftApi do

  describe '#get_people' do
    it 'sends a get request' do
      expect(SalesLoftApi).to receive(:get).and_return(JSON.parse(file_fixture('sample_people.json').read))
      SalesLoftApi.get_people
    end

    it 'should return a hash of people data' do
      expect(SalesLoftApi).to receive(:get).and_return(JSON.parse(file_fixture('sample_people.json').read))
      response = SalesLoftApi.get_people
      expect(response).to be_a(Array)
    end
  end
end
