require 'httparty'

class SalesLoftApi
  include HTTParty
  format :json

  base_uri 'api.salesloft.com/v2/'

  def self.get_people
    response = get("/people.json", {
      headers: {'Authorization' => "Bearer #{Rails.application.secrets.api_key}"}
    })
  end
end
