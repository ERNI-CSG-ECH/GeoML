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
