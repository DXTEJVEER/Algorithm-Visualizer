//MERGE SORT ALGORITHM STARTS
//Initial call executes this function
//Rather than returning the sorted array, it return the steps it performed
//to get sorted array.
export function mergesort(array) {
  const steps = [];
  if (array.length <= 1) return array;
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, steps);
  return steps;
}
//mergesort function calls this function to start recursion
// this function divides the array into two halves by middle index
function mergeSortHelper(mainArray, start, end, auxArray, steps) {
  if (start === end) return;
  const mid = Math.floor((start + end) / 2);
  mergeSortHelper(auxArray, start, mid, mainArray, steps);
  mergeSortHelper(auxArray, mid + 1, end, mainArray, steps);
  merge(mainArray, auxArray, start, mid, end, steps);
}
//this function combines the the two sorted arrays
function merge(mainArray, auxArray, start, mid, end, steps) {
  let m = start;
  let i = start;
  let j = mid + 1;
  while (i <= mid && j <= end) {
    steps.push([i, j]);
    steps.push([i, j]);
    if (auxArray[i] <= auxArray[j]) {
      steps.push([m, auxArray[i]]);
      mainArray[m++] = auxArray[i++];
    } else {
      steps.push([m, auxArray[j]]);
      mainArray[m++] = auxArray[j++];
    }
  }
  while (i <= mid) {
    steps.push([i, i]);
    steps.push([i, i]);
    steps.push([m, auxArray[i]]);
    mainArray[m++] = auxArray[i++];
  }
  while (j <= end) {
    steps.push([j, j]);
    steps.push([j, j]);
    steps.push([m, auxArray[j]]);
    mainArray[m++] = auxArray[j++];
  }
}
//MERGE SORT ALGORITHM ENDS

// QUICKSORT ALGORITHM STARTS
//This version of Quicksort chooses last element of array as pivot
export function quicksort(array) {
  const sortSteps = [];
  quickSortHelper(array, 0, array.length - 1, sortSteps);
  return [sortSteps, array];
}
function quickSortHelper(mainArray, start, end, sortSteps) {
  if (start < end) {
    let pivot = partition(mainArray, start, end, sortSteps);
    quickSortHelper(mainArray, start, pivot - 1, sortSteps);
    quickSortHelper(mainArray, pivot + 1, end, sortSteps);
  }
}
function partition(mainArray, start, end, sortSteps) {
  let pivotValue = mainArray[end];
  let i = start - 1;
  // let temp = 0;
  for (let j = start; j <= end - 1; j++) {
    if (mainArray[j] <= pivotValue) {
      sortSteps.push([j, end]);
      sortSteps.push([j, end]);
      i++;
      sortSteps.push([i, j]);
      const temp = mainArray[i];
      mainArray[i] = mainArray[j];
      mainArray[j] = temp;
    }
    // else {
    //   sortSteps.push([j, end]);
    //   sortSteps.push([j, end]);
    //   sortSteps.push([j, j]);
    // }
  }
  i++;
  sortSteps.push([i, i]);
  sortSteps.push([i, i]);
  sortSteps.push([i, end]);

  const temp = mainArray[i];
  mainArray[i] = mainArray[end];
  mainArray[end] = temp;
  return i;
}
// QUICKSORT ALGORITHM ENDS

// BUBBLESORT ALGORITHM STARTS
export function bubblesort(array) {
  let steps = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      steps.push([j, j + 1]);
      steps.push([j, j + 1]);
      if (array[j] > array[j + 1]) {
        steps.push([j, j + 1]);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else {
        steps.push([j, j]);
      }
    }
  }
  return [array, steps];
}
// BUBBLESORT ALGORITHM ENDS

// INSERTIONSORT ALGORITHM STARTS
export function insertionsort(array) {
  const steps = [];
  for (let i = 1; i < array.length; i++) {
    //iteration
    let marker = i;
    let temp = array[i];
    while (array[marker - 1] > temp && marker !== 0) {
      //shift values to right i.e. overwrite right value with left
      steps.push([marker, marker - 1]);
      steps.push([marker, marker - 1]);
      steps.push([marker, array[marker - 1]]);
      array[marker] = array[marker - 1];
      marker--;
    }
    steps.push([marker, i]);
    steps.push([marker, i]);
    steps.push([marker, temp]);
    array[marker] = temp;
    //assign at appropriate location
  }
  return [array, steps];
}
// INSERTIONSORT ALGORITHM ENDS

// SELECTIONSORT ALGORITHM STARTS
export function selectionsort(array) {
  const steps = [];
  for (let i = 0; i < array.length; i++) {
    const [ind, temp] = minimum(array, i);
    steps.push(...temp);
    steps.push([i, ind]);
    steps.push([i, ind]);
    steps.push([i, ind]);
    let temporaory = array[i];
    array[i] = array[ind];
    array[ind] = temporaory;
  }
  return [array, steps];
}
function minimum(anArray, start) {
  let min = anArray[start];
  let minIndex = start;
  let step = [];
  for (let j = start + 1; j < anArray.length; j++) {
    if (min > anArray[j]) {
      step.push([minIndex, j]);
      step.push([minIndex, j]);
      step.push([j, j]);
      min = anArray[j];
      minIndex = j;
    }
  }
  return [minIndex, step];
}

// SELECTIONSORT ALGORITHM ENDS
