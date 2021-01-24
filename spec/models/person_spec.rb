require 'rails_helper'

describe Person do
  describe ".all" do
    let(:people) { Person.all }

    it 'returns a list of all people as person objects' do
      expected_result = JSON.parse(fake_salesloft_people)['data']
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