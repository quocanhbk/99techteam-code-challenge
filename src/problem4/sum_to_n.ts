/**
 * Use the formula for the sum of an arithmetic series, this is the most efficient way
 * Time Complexity: O(1)
 */
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

/**
 * Iterative: Use traditional loop to sum the numbers
 * Time Complexity: O(n)
 */
function sum_to_n_b(n: number): number {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

/**
 * Functional: Use Array.from to create an array of numbers and reduce to sum them
 * Time Complexity: O(n)
 */
function sum_to_n_c(n: number): number {
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (acc, curr) => acc + curr,
    0
  );
}
