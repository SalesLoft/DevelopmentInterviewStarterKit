require 'rails_helper'
require 'algorithm'

describe Algorithm do
  context "where obj is an array" do
    let(:obj) { ["google", "facebook", "amazon"] }

    describe ".count_uniq_characters" do
      it "should return counted characters in an array of arrays" do
        expected_result = [["g", 2], ["o", 5], ["l", 1], ["e", 2], ["f", 1], ["a", 3], ["c", 1], ["b", 1], ["k", 1], ["m", 1], ["z", 1], ["n", 1]]

        expect(Algorithm.count_uniq_characters(obj)).to eq(expected_result)
      end
    end

    describe ".count_and_sort_uniq_characters" do
      it "should return counted characters in an array of arrays sorted in descending order by count" do
        expected_result = [["o", 5], ["a", 3], ["g", 2], ["e", 2], ["c", 1], ["f", 1], ["l", 1], ["z", 1], ["m", 1], ["k", 1], ["b", 1], ["n", 1]]

        expect(Algorithm.count_and_sort_uniq_characters(obj)).to eq(expected_result)
      end
    end
  end

  context "where obj is a string" do
    let(:obj) { "googleee" }

    describe ".count_uniq_characters" do
      it "should return counted characters in an array of arrays" do
        expected_result = [["g", 2], ["o", 2], ["l", 1], ["e", 3]]

        expect(Algorithm.count_uniq_characters(obj)).to eq(expected_result)
      end
    end

    describe ".count_and_sort_uniq_characters" do
      it "should return counted characters in an array of arrays sorted in descending order by count" do
        expected_result = [["e", 3], ["o", 2], ["g", 2], ["l", 1]]

        expect(Algorithm.count_and_sort_uniq_characters(obj)).to eq(expected_result)
      end
    end
  end

  describe ".sort_counted_characters" do
    let(:characters_count) { [["a", 1], ["b", 3],["c", 2]] }

    it "should sort the characters in descending order by count" do
      expected_result = [["b", 3], ["c", 2], ["a", 1]]

      expect(Algorithm.sort_counted_characters(characters_count)).to eq(expected_result)
    end
  end

  describe ".transposition?" do
    it "should return true for strings with a transposition" do
      string1, string2 = "oled", "olde"

      expect(Algorithm.transposition?(string1, string2)).to be true
    end

    it "should return false for strings that are anagrams without direct transpositions" do
      string1, string2 = "cinema", "iceman"

      expect(Algorithm.transposition?(string1, string2)).to be false
    end

    it "should return false for strings that are the smae" do
      string1, string2 = "bird", "bird"

      expect(Algorithm.transposition?(string1, string2)).to be false
    end

    it "should return false for strings that are not the same length" do
      string1, string2 = "old", "olde"

      expect(Algorithm.transposition?(string1, string2)).to be false
    end
  end

  describe ".stray_character?" do
    it "should return true for strings where one has an extra character in the middle" do
      string1, string2 = "old", "oled"

      expect(Algorithm.stray_character?(string1, string2)).to be true
    end

    it "should return true when the extra character is in the first string" do
      string1, string2 = "oled", "old"

      expect(Algorithm.stray_character?(string1, string2)).to be true
    end

    it "should return true for strings where one has an extra character at the end" do
      string1, string2 = "old", "olde"

      expect(Algorithm.stray_character?(string1, string2)).to be true
    end

    it "should return true for strings where one has an extra character at the begining" do
      string1, string2 = "old", "told"

      expect(Algorithm.stray_character?(string1, string2)).to be true
    end

    it "should return false for strings that are the same" do
      string1, string2 = "old", "old"

      expect(Algorithm.stray_character?(string1, string2)).to be false
    end

    it "should return false for strings with more than one extra character" do
      string1, string2 = "old", "oldie"

      expect(Algorithm.stray_character?(string1, string2)).to be false
    end
  end

  describe ".possible_duplicates?" do
    after(:each) do
      Algorithm.possible_duplicates?("any", "words")
    end

    it "should call .transposition?" do
      expect(Algorithm).to receive(:transposition?)
    end

    it "should call .stray_character?" do
      expect(Algorithm).to receive(:stray_character?)
    end
  end

  describe ".possible_duplicates_list" do
    let(:array) { ["bird", "brid", "bride", "drib", "brdi", "ibrd"] }
    let(:result) { Algorithm.possible_duplicates_list(array) }

    it "should find pairs with transpositions" do
      expect(result).to include(["brid", "brdi"])
    end

    it "should find pairs with stray characters" do
      expect(result).to include(["brid", "bride"])
    end
  end
end