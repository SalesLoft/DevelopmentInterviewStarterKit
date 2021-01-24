class Api::PeopleController < Api::BaseController
  def index
    @people = Person.all

    render json: @people.to_json, status: :ok
  end

  def email_character_count
    @count = Person.email_character_count

    render json: @count.to_json, status: :ok
  end
end