export interface Result {
  humanTotal: number,
  botTotal: number
  checks: Check[]
}

export interface Check {
  task: number;
  correct: number;
  botPoints: number;
  humanPoints: number;
}
