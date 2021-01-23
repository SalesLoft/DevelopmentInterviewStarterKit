class Person
  # abstracts from the api. this would make it easy to convert to using local persistance instead of api for every request.
  def self.all
    api = SalesloftApi.new
    api.people['data']
  end
end