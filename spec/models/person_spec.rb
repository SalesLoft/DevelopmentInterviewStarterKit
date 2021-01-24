require 'rails_helper'
require 'algorithm'

describe Person do
  describe '.email_character_count' do
    it "should return the count of email addresses for all people" do
      emails = JSON.parse(fake_salesloft_people)['data'].map { |person| person["email_address"] }
      expected_result = Algorithm.count_and_sort_uniq_characters(emails)
      
      expect(Person.email_character_count).to eq(expected_result)
    end
  end

  describe ".all" do
    let(:people) { Person.all }

    it 'returns a list of all people as person objects' do
      expected_count = JSON.parse(fake_salesloft_people)['data'].count

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
end