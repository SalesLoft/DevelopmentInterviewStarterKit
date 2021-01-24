class Algorithm
  def self.count_and_sort_uniq_characters(obj)
    characters_count = count_uniq_characters(obj)
    sort_counted_characters(characters_count)
  end

  def self.count_uniq_characters(obj)
    obj = obj.join if obj.is_a?(Array)
    obj.chars.group_by{ |character| character}.map{ |character,entries| [character, entries.count] }
  end

  def self.sort_counted_characters(characters_count)
    characters_count.sort_by { |character_count| character_count[1]}.reverse!
  end
end