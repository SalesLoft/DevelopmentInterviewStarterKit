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

  def self.last_salesloft_update
    updated_ats = Person.all(api_only: false).pluck(:salesloft_updated_at)

    return nil unless updated_ats.present?

    updated_ats.sort.last
  end

  def self.all(api_only: true)
    return super() unless api_only

    api = SalesloftApi.new

    api.people["data"].map { |person| Person.new(person.slice("id", "display_name", "email_address", "title")) }
  end
end
