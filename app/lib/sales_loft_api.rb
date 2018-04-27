require 'httparty'
require 'will_paginate/array'

class SalesLoftApi
  include HTTParty
  format :json

  base_uri 'api.salesloft.com/v2/'

  def self.get_people(current_page = 1)
    query = { include_paging_counts: true }
    query[:page] = current_page if current_page.present?

    response = get("/people.json", {
      headers: {'Authorization' => "Bearer #{Rails.application.secrets.api_key}"},
      query: query
    })

    paging = response["metadata"]["paging"]

    paginated = WillPaginate::Collection.create(current_page, paging["per_page"], paging["total_count"]) do |pager|
      pager.replace(response['data'].to_a)
    end
    paginated
  end
end
