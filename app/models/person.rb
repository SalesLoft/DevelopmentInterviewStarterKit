class Person
  def self.all
    api = SalesloftApi.new
    api.people['data']
  end
end