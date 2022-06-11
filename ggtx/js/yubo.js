let array1 = [3, 4, 5, 7, 9];
let array2 = [4, 8, 9, 12];
let array3 = new Array(array1.length + array2.length);

let i = 0;
let j = 0;
let k = 0;
let length1 = array1.length;
let length2 = array2.length;
while (i < length1 && j < length2) {
    if (array1[i] <= array2[j]) {
        array3[k] = array1[i];
        i++;
        k++;
    } else {
        array3[k] = array2[j];
        j++;
        k++;
    }
}