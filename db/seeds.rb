category_names = %w[Educational Cards Strategy Adventure Puzzles Economy Party Arcade Gambling RPG Logical Co-op Children Family Wargaming Legacy]

category_names.each do |name|
  Category.create(name: name)
end