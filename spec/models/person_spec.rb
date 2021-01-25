require 'rails_helper'
require 'algorithm'

describe Person do
  describe ".email_character_count" do
    it "should return the count of email addresses for all people" do
      emails = JSON.parse(fake_salesloft_people)["data"].map { |person| person["email_address"] }
      expected_result = Algorithm.count_and_sort_uniq_characters(emails)
      
      expect(Person.email_character_count).to eq(expected_result)
    end
  end

  describe ".all" do
    let(:people) { Person.all }

    it "returns a list of all people as person objects" do
      expected_count = JSON.parse(fake_salesloft_people)["data"].count

      expect(people.count).to eq(expected_count)
      people.each do |person|
        expect(person).to be_a Person
        expect(person.id).to be
        expect(person.display_name).to be
        expect(person.email_address).to be
        expect(person.title).to be
      end
    end
  end

  describe ".emails" do
    it "should retern an array of all peoples' emails" do
      expected_result = JSON.parse(fake_salesloft_people)["data"].map { |person| person["email_address"] }

      expect(Person.emails).to eq(expected_result)
    end
  end

  describe ".possible_duplicate_emails" do
    it "should return possible duplicates" do
      expected_result = [["happytrees@salesloft.com", "happytreees@salesloft.com"], ["batcave@salesloft.com", "bactave@salesloft.com"]]

      expect(Person.possible_duplicate_emails).to eq(expected_result)
    end
  end

  describe ".last_salesloft_update" do
    it "returns the most recent salesloft_updated_at value" do
      person1 = create(:person, salesloft_updated_at: "2020-01-20T04:46:19.961197-05:00")
      person2 = create(:person, salesloft_updated_at: "2020-01-20T09:46:19.961197-05:00")
      
      expect(Person.last_salesloft_update).to eq(person2.salesloft_updated_at)
    end
  end

end