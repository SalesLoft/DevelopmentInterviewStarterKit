class SalesloftApi
  # leaving open to add oauth authentication
  def initialize(authentication: 'api_key')
    @authentication = authentication
  end

  def show_people
    if authentication == 'api_key'
      response = RestClient.get base_url + 'people', headers
    else
      raise 'unrecognized authentication type'
    end

    JSON.parse(response.body)
  end
  
  private
  attr_reader :authentication

  def base_url
    'https://api.salesloft.com/v2/'
  end

  def headers
    { Authorization: "Bearer #{api_key}" }
  end

  def api_key
    ENV['SALESLOFT_API_KEY']
  end
end
