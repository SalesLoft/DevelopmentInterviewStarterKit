require 'algorithm'

class Person
  attr_accessor :id, :display_name, :email_address, :title

  def initialize(attributes = {})
    @id = attributes["id"]
    @display_name = attributes["display_name"]
    @email_address = attributes["email_address"]
    @title = attributes["title"]
  end

  def self.email_character_count
    Algorithm.count_and_sort_uniq_characters(emails)
  end

  def self.possible_duplicate_emails
    Algorithm.possible_duplicates_list(emails)
  end

  def self.emails
    all.map(&:email_address)
  end

  # abstracts from the api. this would make it easy to convert to using local persistance instead of api for every request.
  def self.all
    api = SalesloftApi.new

    api.people["data"].map { |person| Person.new(person) }
  end

end