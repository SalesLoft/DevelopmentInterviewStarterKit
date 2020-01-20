class Api::PeopleController < Api::BaseController
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
      #, debug_output: STDOUT
    })
    render json: response
  end

  def create
    params.permit(:first_name, :last_name, :title, :email_address)

    body = JSON.parse(request.body.read)

    response = HTTParty.post("https://api.salesloft.com/v2/people.json", {
      headers: {
        "Authorization" => "Bearer " + ENV["SALESLOFT_API_KEY"],
        "Content-Type" => "application/x-www-form-urlencoded,application/json"
      },
      :body => body
    })
    render json: response
  end

  def update
    params.permit(:id)
    id = params[:id]

    # Get the content to update with and remove any nil values (which the API does not like being present)
    body = JSON.parse(request.body.read)
    body.delete_if { |k,v| v.nil? }

    response = HTTParty.put("https://api.salesloft.com/v2/people/#{id}.json", {
      headers: {
        "Authorization" => "Bearer " + ENV["SALESLOFT_API_KEY"],
        "Content-Type" => "application/x-www-form-urlencoded,application/json"
      },
      :body => body
    })
    render json: response
  end

  def destroy
    params.permit(:id)
    id = params[:id]

    response = HTTParty.delete("https://api.salesloft.com/v2/people/#{id}.json", {
      headers: {
        "Authorization" => "Bearer " + ENV["SALESLOFT_API_KEY"],
        "Content-Type" => "application/x-www-form-urlencoded,application/json"
      }
    })
    render json: response
  end
end
