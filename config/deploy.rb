set :repo_url,     'git@github.com:karczewskiPiotr/binar-games.git'
set :stages,       %w(production)

# Files that are not stored in repository. You need to manually create them on server.
set :linked_files, %w(config/database.yml config/unicorn.rb)
# Add folders that you want to link. These folders will not be overwritten after the deploy
# because they won't be present in repository.
# For example if you have the uploads folder and you don't want to lose files
# every time you deploy, add this folder here (public/uploads)
set :linked_dirs,  %w(log vendor/bundle tmp/sockets tmp/pids tmp/cache)

set :keep_releases, 5
set :normalize_asset_timestamps, %(public/images public/javascripts public/stylesheets)