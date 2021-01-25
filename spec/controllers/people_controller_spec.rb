require 'rails_helper'

describe Api::PeopleController do
  describe "#index" do
    before(:each) do
      get :index
    end
    
    it "should be successful" do
      expect(response).to be_successful
    end

    it "should be formatted correctly" do
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

  describe "#email_character_count" do
    before(:each) do
      get :email_character_count
    end

    it "should be successful" do
      expect(response).to be_successful
    end

    it "should be formatted correctly" do
      data = JSON.parse(response.body)

      expect(data).to be_an Array
      data.each do |character_count|
        expect(character_count).to be_an Array
        expect(character_count[0]).to be_a String
        expect(character_count[1]).to be_a Integer
      end
    end
  end

  describe "#email_dups" do
    before(:each) do
      get :email_dups
    end

    it "should be successful" do
      expect(response).to be_successful
    end

    it "should be formatted correctly" do
      data = JSON.parse(response.body)

      expect(data).to be_an Array
      data.each do |pairs|
        expect(pairs).to be_an Array
        expect(pairs[0]).to be_a String
        expect(pairs[1]).to be_a String
      end
    end
  end
end