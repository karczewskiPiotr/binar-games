Rails.application.routes.draw do
  devise_for :users
  resources :users
  resources :games
  resources :events , only: [:index, :create, :show, :new]

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
    end
  end

  resources :relationships,       only: [:create, :destroy]

end
