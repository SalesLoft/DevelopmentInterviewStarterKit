class Api::MeController < Api::BaseController
  respond_to :json

  def me
    current_user ? (respond_with({ user: current_user })) : respond_with {}
  end
end
