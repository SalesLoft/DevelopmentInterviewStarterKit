module WebmockHelpers
  def stub_salesloft_people
    stub_request(:get, "https://api.salesloft.com/v2/people").
        with(headers:{Authorization: "Bearer #{ENV["SALESLOFT_API_KEY"]}"}).
        to_return(status: 200, body: fake_salesloft_people, headers: {})
  end

  def fake_salesloft_people
    '{"data":[{"id":1,"display_name":"Bob Ross","email_address":"happytrees@salesloft.com","title":"Painter"},{"id":2,"display_name":"Batman","email_address":"batcave@salesloft.com","title":"Bringer of Justice"},{"id":3,"display_name":"Salvador dali","email_address":"meltedclock@salesloft.com","title":"Painter"},{"id":4,"display_name":"Bob Ross","email_address":"happytreees@salesloft.com","title":"Painter"},{"id":5,"display_name":"Batman","email_address":"bactave@salesloft.com","title":"Bringer of Justice"}]}'
  end
end