import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Check, InformationData, Result, TaskData } from '../model/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  humanScore = 0;
  botScore = 0;
  checks: Check[] = [];

  randomTasks$: Promise<string[]>;

  constructor(private http: HttpClient, private database: AngularFireDatabase, private storage: AngularFireStorage) {
    this.randomTasks$ = this.loadRandomTasks();
  }

  checkTask(taskId: string, guess: number): Promise<Check> {
    return this.database.database
      .ref(`data/${taskId}`)
      .get()
      .then((task) => {
        const taskData = task.toJSON() as TaskData;
        const delta = Math.abs(guess - taskData.correct);
        const botDelta = Math.abs(taskData.botGuess - taskData.correct);
        const humanPoints = delta > 4 ? 0 : Math.pow(4 - delta, 2);
        const botPoints = botDelta > 4 ? 0 : Math.pow(4 - botDelta, 2);

        this.humanScore += humanPoints;
        this.botScore += botPoints;

        const mapped: Check = {
          task: taskId,
          correct: taskData.correct,
          botGuess: taskData.botGuess,
          botPoints: botPoints,
          humanPoints: humanPoints,
        };
        this.checks.push(mapped);

        return mapped;
      });
  }

  getResult(): Result {
    return JSON.parse('{"humanTotal":43,"botTotal":80,"checks":[{"task":"002122","correct":4,"botGuess":4,"botPoints":16,"humanPoints":1},{"task":"000021","correct":1,"botGuess":1,"botPoints":16,"humanPoints":16},{"task":"001357","correct":1,"botGuess":1,"botPoints":16,"humanPoints":16},{"task":"001902","correct":4,"botGuess":4,"botPoints":16,"humanPoints":1},{"task":"000381","correct":2,"botGuess":2,"botPoints":16,"humanPoints":9}]}')
/*     return {
      humanTotal: this.humanScore,
      botTotal: this.botScore,
      checks: this.checks,
    }; */
  }

  getInfo(taskId: string): Promise<InformationData> {
    return this.database.database
      .ref(`data/${taskId}/information`)
      .get()
      .then((information) => {
        return information.toJSON() as InformationData;
      });
  }

  reset(): void {
    this.botScore = 0;
    this.humanScore = 0;
    this.checks = [];
    this.randomTasks$ = this.loadRandomTasks();
  }

  loadImage(task: string, checked: boolean): Promise<string> {
    return this.storage.storage.ref(`images/${task}_${checked ? 'result' : 'initial'}.png`).getDownloadURL();
  }

  private loadRandomTasks(): Promise<string[]> {
    return this.database.database
      .ref('data')
      .get()
      .then((snapshot) => {
        const randomTasks: string[] = [];
        const allTasks = snapshot.toJSON() as { [id: string]: TaskData };
        const numberOfTasks = Object.keys(allTasks).length;
        for (let i = 0; i < 5; i++) {
          const randomIdx = Math.floor(Math.random() * numberOfTasks);
          randomTasks.push(Object.keys(allTasks)[randomIdx]);
        }
        return randomTasks;
      });
  }
}
