role :app,        %w(binar-games.binar.app)
role :web,        %w(binar-games.binar.app)
role :db,         %w(binar-games.binar.app)
set :application, 'binar-games'

server 'binar-games.binar.app', user: fetch(:application), roles: %w(web app db), primary: true

set :rails_env,   'production'
set :branch,      'master' # select which branch should be deployed
set :deploy_to,   "/home/#{fetch(:application)}/www/"

set :rvm_ruby_version, '2.6.3@binar-games'	# put Ruby version and gemset name here
# set :rvm_type, :system	# uncomment if you need to choose RVM installation manually
# set :rvm_map_bins, %w(rake gem bundle ruby rails)	# uncomment if you need to specify which commands should be prefixed with RVM

namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 10 do
      execute 'sudo systemctl restart $USER-unicorn.service'
    end
  end

  after :publishing, :restart
end