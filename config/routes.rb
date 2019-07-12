Rails.application.routes.draw do
  root "games#index"
  devise_for :users
  resources :games
  scope format: true, constraints: { format: 'json' } do
    resources :categories, only: [:index, :show]
   end
end
