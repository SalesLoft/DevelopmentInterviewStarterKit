class SalesloftApi
  # leaving open to add oauth authentication
  def initialize(authentication: 'api_key')
    @authentication = authentication
  end

  def people
    response = RestClient.get base_url + 'people', headers
    JSON.parse(response.body)
  end
  
  private
  attr_reader :authentication

  def base_url
    'https://api.salesloft.com/v2/'
  end

  def headers
    if authentication == 'api_key'
      key = api_key
    else
      raise 'unrecognized authentication type'
    end

    { Authorization: "Bearer #{key}" }
  end

  def api_key
    ENV['SALESLOFT_API_KEY']
  end
end
