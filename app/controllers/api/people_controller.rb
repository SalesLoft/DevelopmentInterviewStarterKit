class Api::PeopleController < Api::BaseController
  protect_from_forgery with: :null_session

  respond_to :json

  def index
    params.permit(:page, :limit)
    limit = params[:limit].to_i
    if limit <= 10
      limit = 10
    elsif limit >= 100
      limit = 100
    end
    page = params[:page].to_i
    if page < 1
      page = 1
    end

    response = HTTParty.get("https://api.salesloft.com/v2/people.json?include_paging_counts=true&per_page=#{limit}&page=#{page}", {
      headers: {
        "Authorization" => "Bearer " + ENV["SALESLOFT_API_KEY"],
        "Content-Type" => "application/json"
      }
      # , debug_output: STDOUT, # To show that User-Agent is Httparty
    })
    render json: response
  end

  def create
    params.permit(:first_name, :last_name, :title, :email_address)

    #json_params = ActionController::Parameters.new( JSON.parse(request.body.read) )

    body = JSON.parse(request.body.read)

    logger.debug "POST BODY: #{body}"

    response = HTTParty.post("https://api.salesloft.com/v2/people.json", {
      headers: {
        "Authorization" => "Bearer " + ENV["SALESLOFT_API_KEY"],
        "Content-Type" => "application/x-www-form-urlencoded,application/json"
      },
      :body => body,
      debug_output: STDOUT, # To show that User-Agent is Httparty
    })
    render json: response
  end
end
