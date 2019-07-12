Rails.application.routes.draw do
  get "/test" => "application#header"
  devise_for :users
  resources :users
  devise_scope :user do
    root to: "devise/sessions#new"
  end
end
