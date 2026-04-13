export type StepState = {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  label: string;
};

function snapshot(
  arr: number[],
  comparing: number[],
  swapping: number[],
  sorted: number[],
  label: string
): StepState {
  return {
    array: [...arr],
    comparing,
    swapping,
    sorted: [...sorted],
    label,
  };
}

export function bubbleSort(input: number[]): StepState[] {
  const arr = [...input];
  const steps: StepState[] = [];
  const n = arr.length;
  const sorted: number[] = [];

  steps.push(snapshot(arr, [], [], [], "Start"));

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push(snapshot(arr, [j, j + 1], [], sorted, `Compare index ${j} and ${j + 1}`));
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push(snapshot(arr, [], [j, j + 1], sorted, `Swap ${arr[j + 1]} and ${arr[j]}`));
      }
    }
    sorted.push(n - 1 - i);
  }
  sorted.push(0);
  steps.push(snapshot(arr, [], [], sorted, "Done!"));
  return steps;
}

export function insertionSort(input: number[]): StepState[] {
  const arr = [...input];
  const steps: StepState[] = [];
  const n = arr.length;
  const sorted: number[] = [0];

  steps.push(snapshot(arr, [], [], [], "Start"));

  for (let i = 1; i < n; i++) {
    let j = i;
    steps.push(snapshot(arr, [j], [], sorted, `Insert element at index ${i}`));
    while (j > 0 && arr[j - 1] > arr[j]) {
      steps.push(snapshot(arr, [j - 1, j], [], sorted, `Compare index ${j - 1} and ${j}`));
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      steps.push(snapshot(arr, [], [j - 1, j], sorted, `Swap ${arr[j]} and ${arr[j - 1]}`));
      j--;
    }
    sorted.push(i);
    steps.push(snapshot(arr, [], [], sorted, `Index ${i} inserted`));
  }

  const allSorted = Array.from({ length: n }, (_, i) => i);
  steps.push(snapshot(arr, [], [], allSorted, "Done!"));
  return steps;
}

export function quickSort(input: number[]): StepState[] {
  const arr = [...input];
  const steps: StepState[] = [];
  const sorted: number[] = [];

  steps.push(snapshot(arr, [], [], [], "Start"));

  function partition(lo: number, hi: number): number {
    const pivot = arr[hi];
    steps.push(snapshot(arr, [hi], [], sorted, `Pivot: ${pivot} (index ${hi})`));
    let i = lo;
    for (let j = lo; j < hi; j++) {
      steps.push(snapshot(arr, [j, hi], [], sorted, `Compare ${arr[j]} with pivot ${pivot}`));
      if (arr[j] <= pivot) {
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push(snapshot(arr, [], [i, j], sorted, `Swap ${arr[j]} and ${arr[i]}`));
        }
        i++;
      }
    }
    if (i !== hi) {
      [arr[i], arr[hi]] = [arr[hi], arr[i]];
      steps.push(snapshot(arr, [], [i, hi], sorted, `Place pivot at index ${i}`));
    }
    sorted.push(i);
    return i;
  }

  function qs(lo: number, hi: number) {
    if (lo >= hi) {
      if (lo === hi) sorted.push(lo);
      return;
    }
    const p = partition(lo, hi);
    qs(lo, p - 1);
    qs(p + 1, hi);
  }

  qs(0, arr.length - 1);
  const allSorted = Array.from({ length: arr.length }, (_, i) => i);
  steps.push(snapshot(arr, [], [], allSorted, "Done!"));
  return steps;
}

export function mergeSort(input: number[]): StepState[] {
  const arr = [...input];
  const steps: StepState[] = [];
  const n = arr.length;
  const sorted: number[] = [];

  steps.push(snapshot(arr, [], [], [], "Start"));

  function merge(lo: number, mid: number, hi: number) {
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;

    while (i < left.length && j < right.length) {
      steps.push(snapshot(arr, [lo + i, mid + 1 + j], [], sorted, `Merge: compare ${left[i]} and ${right[j]}`));
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      steps.push(snapshot(arr, [], [k], sorted, `Place ${arr[k]} at index ${k}`));
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      steps.push(snapshot(arr, [], [k], sorted, `Place ${arr[k]} at index ${k}`));
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      steps.push(snapshot(arr, [], [k], sorted, `Place ${arr[k]} at index ${k}`));
      j++;
      k++;
    }
  }

  function ms(lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    ms(lo, mid);
    ms(mid + 1, hi);
    merge(lo, mid, hi);
  }

  ms(0, n - 1);
  const allSorted = Array.from({ length: n }, (_, i) => i);
  steps.push(snapshot(arr, [], [], allSorted, "Done!"));
  return steps;
}

export const algorithms = {
  "Bubble Sort": bubbleSort,
  "Insertion Sort": insertionSort,
  "Quick Sort": quickSort,
  "Merge Sort": mergeSort,
} as const;

export type AlgorithmName = keyof typeof algorithms;