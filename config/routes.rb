Rails.application.routes.draw do
  devise_for :users
  resources :users
  resources :games

  devise_scope :user do
    root to: "devise/sessions#new"
  end
  
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :games, only: [:index, :show]
      resources :categories, only: [:index, :show]
    end
  end
end
