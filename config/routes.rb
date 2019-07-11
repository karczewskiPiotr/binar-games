Rails.application.routes.draw do
 get "/test" => "application#test"
  devise_for :users
  resources :games
  get 'games/index'
  root "games#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
