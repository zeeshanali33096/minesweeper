export const generateMines = (size: number) => {
  const logicArray = generateMinesLogicArray(size, 12);
  const clickedArr = generateNewClickedArray(size);
  return { logicArray, clickedArr };
};

export const generateMinesLogicArray = (size: number, difficulty: number) => {
  const arr = new Array(size)
    .fill(0)
    .map(() =>
      new Array(size)
        .fill(0)
        .map(() =>
          Math.round(Math.random() * Math.pow(10, 10)) % difficulty === 0
            ? 1
            : 0
        )
    );
  return generateMinesLogic(size, arr);
};

export const generateNewClickedArray = (size: number) =>
  new Array(size).fill(0).map(() => new Array(size).fill(0).map(() => false));

const generateMinesLogic = (size: number, arr: number[][]) => {
  let newArr = new Array(size).fill(0).map(() => {
    const subArr = new Array(size).fill(0).map(() => 0);
    return subArr;
  });
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (arr[i][j] === 1) {
        if (i === 0 && j === 0) {
          //top left corner
          newArr[i + 1][j] = newArr[i + 1][j] + 1; //bottom
          newArr[i][j + 1] = newArr[i][j + 1] + 1; //right
          newArr[i + 1][j + 1] = newArr[i + 1][j + 1] + 1; //bottom right
        } else if (i === 0 && j === size - 1) {
          //top right corner
          newArr[i + 1][j] = newArr[i + 1][j] + 1; //bottom
          newArr[i][j - 1] = newArr[i][j - 1] + 1; //left
          newArr[i + 1][j - 1] = newArr[i + 1][j - 1] + 1; //bottom left
        } else if (i === size - 1 && j === 0) {
          //bottom left corner
          newArr[i - 1][j] = newArr[i - 1][j] + 1; //top
          newArr[i][j + 1] = newArr[i][j + 1] + 1; //right
          newArr[i - 1][j + 1] = newArr[i - 1][j + 1] + 1; //top right
        } else if (i === size - 1 && j === size - 1) {
          //bottom right corner
          newArr[i - 1][j] = newArr[i - 1][j] + 1; //top
          newArr[i - 1][j - 1] = newArr[i - 1][j - 1] + 1; //top left
          newArr[i][j - 1] = newArr[i][j - 1] + 1; //left
        } else if (i === size - 1) {
          //bottom row
          newArr[i][j + 1] = newArr[i][j + 1] + 1; //right
          newArr[i][j - 1] = newArr[i][j - 1] + 1; //left
          newArr[i - 1][j] = newArr[i - 1][j] + 1; //top
          newArr[i - 1][j - 1] = newArr[i - 1][j - 1] + 1; //top left
          newArr[i - 1][j + 1] = newArr[i - 1][j + 1] + 1; //top right
        } else if (j === size - 1) {
          //right col
          newArr[i - 1][j] = newArr[i - 1][j] + 1; //top
          newArr[i - 1][j - 1] = newArr[i - 1][j - 1] + 1; //top left
          newArr[i][j - 1] = newArr[i][j - 1] + 1; //left
          newArr[i + 1][j - 1] = newArr[i + 1][j - 1] + 1; //bottom left
          newArr[i + 1][j] = newArr[i + 1][j] + 1; //bottom
        } else if (i === 0) {
          //top row
          newArr[i + 1][j] = newArr[i + 1][j] + 1; //bottom
          newArr[i][j + 1] = newArr[i][j + 1] + 1; //right
          newArr[i + 1][j + 1] = newArr[i + 1][j + 1] + 1; //bottom right
          newArr[i][j - 1] = newArr[i][j - 1] + 1; //left
          newArr[i + 1][j - 1] = newArr[i + 1][j - 1] + 1; //bottom left
        } else if (j === 0) {
          //left col
          newArr[i + 1][j] = newArr[i + 1][j] + 1; //bottom
          newArr[i][j + 1] = newArr[i][j + 1] + 1; //right
          newArr[i + 1][j + 1] = newArr[i + 1][j + 1] + 1; //bottom right
          newArr[i - 1][j + 1] = newArr[i - 1][j + 1] + 1; //top right
          newArr[i - 1][j] = newArr[i - 1][j] + 1; //top
        } else {
          //any cell in middle
          newArr[i - 1][j] = newArr[i - 1][j] + 1; //top
          newArr[i - 1][j + 1] = newArr[i - 1][j + 1] + 1; //top right
          newArr[i][j + 1] = newArr[i][j + 1] + 1; //right
          newArr[i + 1][j + 1] = newArr[i + 1][j + 1] + 1; //bottom right
          newArr[i + 1][j] = newArr[i + 1][j] + 1; //bottom
          newArr[i + 1][j - 1] = newArr[i + 1][j - 1] + 1; //bottom left
          newArr[i][j - 1] = newArr[i][j - 1] + 1; //left
          newArr[i - 1][j - 1] = newArr[i - 1][j - 1] + 1; //top left
        }

        newArr[i][j] = 21;
      }
    }
  }
  return newArr;
};
