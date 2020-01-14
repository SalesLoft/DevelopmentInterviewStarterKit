Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  namespace :api, defaults: { format: "json" } do
    get :me, to: 'me#me'
    resources :people, only: [:index]
  end

  match '*path', to: 'main#index', via: :all

  root to: "main#index"
end
