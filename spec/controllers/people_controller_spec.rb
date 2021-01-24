require 'rails_helper'

describe Api::PeopleController do
  describe "#index" do
    it "should be successful" do
      get :index
      expect(response).to be_successful
    end

    it "should be formatted correctly" do
      get :index
      data = JSON.parse(response.body)
      expected_count = JSON.parse(fake_salesloft_people)["data"].count

      expect(data).to be_an Array
      expect(data.count).to eq(expected_count)
      data.each do |person|
        expect(person).to be_a Hash
        expect(person.keys).to include "id"
        expect(person.keys).to include "display_name"
        expect(person.keys).to include "email_address"
        expect(person.keys).to include "title"
      end
    end
  end
end