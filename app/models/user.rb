class User < ApplicationRecord
  devise :rememberable, :trackable, :omniauthable, omniauth_providers: [:salesloft]

  def self.from_omniauth(auth)
    user = where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.name = auth.info.name
      user.team_id = auth.info.team.id
      user.team_admin = auth.info.team.admin
    end

    Token.where(user: user).first_or_create do |token|
      token.user = user
      token.access_token = auth.credentials.token
      token.refresh_token = auth.credentials.refresh_token
      token.expires_at = auth.credentials.expires_at
    end

    user
  end
end
