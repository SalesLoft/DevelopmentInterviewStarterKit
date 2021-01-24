class Api::PeopleController < Api::BaseController
  def index
    @people = Person.all

    render json: @people.to_json, status: :ok
  end
end