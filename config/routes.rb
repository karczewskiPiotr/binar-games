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
      resources :games, only: [:index, :show, :update]
      resources :categories, only: [:index, :show]
      resources :users, only: [:index] 
      get 'users/current/following', to: 'users#following'
      post 'users/current/following', to: 'users#follow'
      post 'users/current/unfollow', to: 'users#unfollow'
      resources :events, only: [:index]
      get '/users/current', to: 'users#current'
      resources :invitations, only: [:index] do
        member do
          post 'accept'
          post 'decline'
        end
      end
    end
  end

  resources :relationships,       only: [:create, :destroy]

end
