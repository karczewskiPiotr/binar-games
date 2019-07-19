Rails.application.routes.draw do
  devise_for :users
  resources :users
  resources :games
  devise_scope :user do
    root to: "devise/sessions#new"
  end
  scope format: true, constraints: { format: 'json' } do
    resources :categories, only: [:index, :show]
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
    end
  end
end
