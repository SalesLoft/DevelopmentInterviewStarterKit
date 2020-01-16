import { useState } from 'react';

export const merge = (...obj) => Object.assign({}, ...obj);

export const encodeGetParams = params => Object.entries(params).map(kv => kv.map(encodeURIComponent).join('=')).join('&');

/**
 * Custom Hook to force the update of a functional component
 */
export function useForceUpdate(){
  const [value, setValue] = useState(false);
  return () => setValue(value => !value);
}

/**
 * Calculate the Levenshtein distance between two provided strings
 * @param  {String} a The first string to calculate the Levenshtein distance for
 * @param  {String} b The second string to calculate the Levenshtein distance for
 * @return Number The Levenshtein distance between the two provided strings
 *
 * @author James Westgate {@link https://stackoverflow.com/users/305319/james-westgate}
 * @see {@link https://stackoverflow.com/questions/11919065/sort-an-array-by-the-levenshtein-distance-with-best-performance-in-javascript}
 */
export const levDist = function(s, t) {
    var d = []; //2d matrix

    // Step 1
    var n = s.length;
    var m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);

        // Step 4
        for (var j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i == j && d[i][j] > 4) return n;

            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    // Step 7
    return d[n][m];
}
