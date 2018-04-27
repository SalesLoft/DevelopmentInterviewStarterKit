class PeopleController < ApplicationController
  def index
    page = params[:page] || 1
    @people = SalesLoftApi.get_people(page)
  end
end
