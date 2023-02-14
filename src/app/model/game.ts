export interface Result {
  humanTotal: number;
  botTotal: number;
  checks: Check[];
}

export interface Check {
  task: string;
  correct: number;
  botGuess: number;
  botPoints: number;
  humanGuess: number;
  humanPoints: number;
}

export interface InformationData {
  cars: number;
  streetLength: number;
  accidentLethal: number;
  accidentSever: number;
  accidentLight: number;
  xCoords: number;
  yCoords: number;
}

export interface TaskData {
  botGuess: number;
  correct: number;
  information: InformationData;
}


export const MOCK_DATA = {
  humanTotal: 30,
  botTotal: 73,
  checks: [
    { task: '001646', correct: 3, botGuess: 3, humanGuess: 1, botPoints: 16, humanPoints: 4 },
    { task: '000459', correct: 4, botGuess: 3, humanGuess: 1, botPoints: 9, humanPoints: 1 },
    { task: '001449', correct: 2, botGuess: 2, humanGuess: 1, botPoints: 16, humanPoints: 9 },
    { task: '000262', correct: 1, botGuess: 1, humanGuess: 1, botPoints: 16, humanPoints: 16 },
    { task: '001829', correct: 4, botGuess: 4, humanGuess: 1, botPoints: 16, humanPoints: 1 },
  ],
};
