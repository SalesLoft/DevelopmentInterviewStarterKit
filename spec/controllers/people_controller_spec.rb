require 'rails_helper'

describe Api::PeopleController do
  describe '#index' do
    it 'should be successful' do
      get :index
      expect(response).to be_successful
    end
  end
end