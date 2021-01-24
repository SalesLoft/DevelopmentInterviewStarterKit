class Algorithm
  # ways to detect possible duplicates
  # transposed letters: character count will be the same
  # missed letter or accitental extra letter: character caount will be off by one, removing the extra letter would create a match
  # return possible duplicates as an array of arrays (pairs of duplicates)

  def self.possible_duplicates_list(array)
    list = []

    while array.length > 1
      string1 = array.shift

      array.each do |string2|
        if possible_duplicates?(string1, string2)
          list << [string1, string2]
        end
      end
    end

    list
  end
  
  def self.possible_duplicates?(string1, string2)
    transposition?(string1, string2)
  end

  def self.transposition?(string1, string2, position = 0)
    return false if position == 0 && (string1 == string2 || string1.length != string2.length)
    return true if string1.length == position

    if string1[position] == string2[position] || string1[position] == string2[position - 1] || string1[position] == string2[position + 1]
      return transposition?(string1, string2, position += 1)
    end

    false
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