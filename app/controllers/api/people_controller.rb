class Api::PeopleController < Api::BaseController

  respond_to :json

  def index
    params.permit(:page)
    page = params[:page].to_i
    if page < 1
      page = 1
    end
    
    response = HTTParty.get("https://api.salesloft.com/v2/people.json?include_paging_counts=true&per_page=100&page=#{page}", {
      headers: {
        "Authorization" => "Bearer " + ENV["SALESLOFT_API_KEY"],
        "Content-Type" => "application/json"
      }
      # , debug_output: STDOUT, # To show that User-Agent is Httparty
    })
    render json: response
  end
end
