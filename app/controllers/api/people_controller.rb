class Api::PeopleController < Api::BaseController
  def index
    @people = Person.all

    render json: @people.to_json(only: ["id", "display_name", "email_address", "title"]), status: :ok
  end
end