Rails.application.routes.draw do
  devise_for :users
  resources :users
  resources :games
  resources :events , only: [:index, :create, :show, :new]
  get "user_profile", to: 'users#user_profile'

  devise_scope :user do
    root to: "devise/sessions#new"
  end

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :games, only: [:index, :show]
      resources :categories, only: [:index, :show]
      resources :users, only: [:index]
      get '/users/current', to: 'users#current'
    end
  end
end
