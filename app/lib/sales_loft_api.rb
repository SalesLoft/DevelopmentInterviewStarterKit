require 'httparty'
require 'will_paginate/array'

class SalesLoftApi
  include HTTParty
  format :json

  base_uri 'api.salesloft.com/v2/'

  def self.get_people(current_page=nil)
    query = { include_paging_counts: true }
    query[:page] = current_page if current_page.present?

    response = get("/people.json", {
      headers: {'Authorization' => "Bearer #{Rails.application.secrets.api_key}"},
      query: query
    })

    paging = response["metadata"]["paging"]
    response['data'].paginate(per_page: paging["per_page"], total_entries: paging["total_count"])
  end
end
