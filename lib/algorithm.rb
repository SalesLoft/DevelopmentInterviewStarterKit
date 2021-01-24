class Algorithm
  # ways to detect possible duplicates
  # transposed letters: character count will be the same
  # missed letter or accitental extra letter: character caount will be off by one, removing the extra letter would create a match
  # return possible duplicates as an array of arrays (pairs or sets of possible duplicates)
  def possible_duplicates(array)

  end

  # this is a start but it would catch any anagrams. I think we can do better
  def strings_with_trasposed_characters(array)
    array.group_by { |string| string.chars.sort }.reject { |chars, strings| strings.count < 2 }.values
  end

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