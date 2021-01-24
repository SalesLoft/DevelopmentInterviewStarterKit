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
end