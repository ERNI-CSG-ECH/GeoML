import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable, tap } from 'rxjs';
import { AppSettings } from '../config/settings';
import { Check, InformationData, Result, TaskData } from '../model/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  firstRound = true;
  humanScore = 0;
  botScore = 0;
  checks: Check[] = [];

  randomTasks$: Promise<string[]>;

  constructor(private http: HttpClient, private firebase: AngularFireDatabase, private storage: AngularFireStorage) {
    this.randomTasks$ = this.loadRandomTasks();
  }

  checkTask(taskId: string, guess: number): Promise<Check> {
    return this.firebase.database
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
    this.firstRound = false;
    return {
      humanTotal: this.humanScore,
      botTotal: this.botScore,
      checks: this.checks,
    };
  }

  getInfo(taskId: string): Promise<InformationData> {
    return this.firebase.database
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
    this.loadRandomTasks();
  }

  loadImage(task: string, checked: boolean): Promise<string> {
    return this.storage.storage.ref(`images/${task}_${checked ? 'result' : 'initial'}.png`).getDownloadURL();
  }

  private loadRandomTasks(): Promise<string[]> {
    return this.firebase.database
      .ref('data')
      .get()
      .then((snapshot) => {
        const randomTasks: string[] = [];
        const allTasks = snapshot.toJSON() as { [id: string]: TaskData };
        const numberOfTasks = Object.keys(allTasks).length;
        for (let i = 0; i < 5; i++) {
          // TODO we can't choose between 2100 to 2399 because the images are missing; remove when ready
          let randomIdx = 2100;
          while (randomIdx >= 2100 && randomIdx < 2400) {
            randomIdx = Math.floor(Math.random() * numberOfTasks);
          }
          randomTasks.push(Object.keys(allTasks)[randomIdx]);
        }
        return randomTasks;
      });
  }
}
