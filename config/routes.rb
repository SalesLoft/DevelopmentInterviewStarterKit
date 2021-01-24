Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  namespace :api, defaults: { format: "json" } do
    get :me, to: 'me#me'

    get 'people/email_character_count', to: 'people#email_character_count', as: 'people_email_character_count'

    resources :people, only: [:index]
  end

  root to: "main#index"
end
