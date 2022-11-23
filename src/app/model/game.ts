export interface Result {
  humanTotal: number;
  botTotal: number;
  checks: Check[];
}

export interface Check {
  task: number;
  correct: number;
  botGuess: number;
  botPoints: number;
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
