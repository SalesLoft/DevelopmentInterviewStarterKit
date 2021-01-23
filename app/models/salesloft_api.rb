class SalesloftApi
  # leaving open to add oauth authentication
  def initialize(authentication: 'api_key')
    @authentication = authentication
  end

  # The instructions don't specify that we must get the whole list of people, but just a list. In a real project i would get clarification on this, but for now I'll just grab the first page. 
  # To get the whole list I might cycle through the pages using the "next_page" value and stopping when the value is null, reconstructing the results of each page into one array.
  # With scailing in mind, I might use a chron job to regularly check the api using the updated_at parameter to get only the changes since last check. This would populate the local DB, and methods would work from that data.
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
