class Algorithm
  # ways to detect possible duplicates
  # transposed letters: character count will be the same
  # missed letter or accitental extra letter: character caount will be off by one, removing the extra letter would create a match
  # return possible duplicates as an array of arrays (pairs of duplicates)

  def self.possible_duplicates_list(array)
    working_array = array.dup

    list = []
    while working_array.length > 1
      string1 = working_array.shift

      working_array.each do |string2|
        if possible_duplicates?(string1, string2)
          list << [string1, string2]
        end
      end
    end

    list
  end
  
  def self.possible_duplicates?(string1, string2)
    transposition?(string1, string2) || stray_character?(string1, string2)
  end

  def self.transposition?(string1, string2)
    return false if string1 == string2 || string1.length != string2.length

    string1.chars.each_with_index do |char, index|
      return false unless char == string2[index] || char == string2[index - 1] || char == string2[index + 1]
    end

    true
  end

  def self.stray_character?(string1, string2)
    short, long = [string1.dup, string2.dup].sort_by { |string| string.length }

    return false unless long.length == short.length + 1

    long.chars.each_with_index do |char, index|
      next if char == short[index]

      long.slice!(index)
      return short == long
    end
  end

  def self.count_and_sort_uniq_characters(obj)
    characters_count = count_uniq_characters(obj)
    sort_counted_characters(characters_count)
  end

  def self.count_uniq_characters(obj)
    obj = obj.join if obj.is_a?(Array)
    obj.chars.group_by{ |character| character}.map{ |character,entries| [character, entries.length] }
  end

  def self.sort_counted_characters(characters_count)
    characters_count.sort_by { |character_count| character_count[1]}.reverse!
  end
end