require 'algorithm'

class Person < ApplicationRecord
  def self.email_character_count
    Algorithm.count_and_sort_uniq_characters(emails)
  end

  def self.possible_duplicate_emails
    Algorithm.possible_duplicates_list(emails)
  end

  def self.emails
    all.map(&:email_address)
  end

  # still needs specs
  def self.update_from_api
    new_people_from_api.each do |person|
      person = person.slice("id", "display_name", "email_address", "title", "updated_at")
      person["salesloft_updated_at"] = person.delete("updated_at")

      if stored_person = Person.all(api_only: false).find_by(id: person["id"])
        stored_person.update(person)
      else
        Person.create(person)
      end
    end

    true
  end

  def self.last_salesloft_update
    updated_ats = Person.all(api_only: false).pluck(:salesloft_updated_at)

    return nil unless updated_ats.present?

    updated_ats.sort.last
  end

  # some specs fail when set to false. need to update them
  def self.all(api_only: true)
    return super() unless api_only

    api = SalesloftApi.new

    api.people["data"].map { |person| Person.new(person.slice("id", "display_name", "email_address", "title")) }
  end

  private

  def self.new_people_from_api
    page = 1
    updated_at = last_salesloft_update
    api = SalesloftApi.new

    people = []
    while page
      response = api.people(page: page, updated_at: updated_at)

      people += response["data"]
      page = response["metadata"]["paging"]["next_page"]
    end

    people
  end
end
