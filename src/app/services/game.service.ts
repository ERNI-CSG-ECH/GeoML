import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, map, mergeMap, Observable } from 'rxjs';
import { Check, InformationData, Result, TaskData, UserResultData } from '../model/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  humanScore = 0;
  botScore = 0;
  checks: Check[] = [];
  tutorialWatched = false;

  randomTasks$: Observable<string[]>;
  uid?: string;

  constructor(
    private database: AngularFireDatabase,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth
  ) {
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
          humanGuess: guess,
          botPoints: botPoints,
          humanPoints: humanPoints,
        };
        this.checks.push(mapped);

        return mapped;
      });
  }

  concludeGame(): Result {
    this.saveResult();
    return {
      humanTotal: this.humanScore,
      botTotal: this.botScore,
      checks: this.checks,
    };
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

  watchedTutorial(): void {
    this.tutorialWatched = true;
  }

  private loadRandomTasks(): Observable<string[]> {
    return from(this.signIn()).pipe(
      mergeMap((signedIn) => {
        if (signedIn) {
          return this.database.database.ref('data').get();
        } else {
          throw new Error('Could not sign in anonymously');
        }
      }),
      map((snapshot) => {
        const randomTasks: string[] = [];
        const allTasks = snapshot.toJSON() as { [id: string]: TaskData };
        const numberOfTasks = Object.keys(allTasks).length;
        for (let i = 0; i < 5; i++) {
          const randomIdx = Math.floor(Math.random() * numberOfTasks);
          randomTasks.push(Object.keys(allTasks)[randomIdx]);
        }
        return randomTasks;
      })
    );
  }

  private signIn(): Promise<boolean> {
    return this.auth
      .signInAnonymously()
      .then((data) => {
        if (data.user) {
          this.uid = data.user.uid;
          return true;
        }
        return false;
      })
      .catch(() => {
        return false;
      });
  }

  private saveResult(): void {
    if (this.uid) {
      const userResult: UserResultData = {
        uid: this.uid,
        timestamp: new Date().toISOString(),
        estimations: [],
      };
      this.checks.forEach((check) => {
        userResult.estimations.push({
          imageId: check.task,
          estimation: check.humanGuess,
        });
      });
      this.database.database.ref('results').push(userResult);
    }
  }
}
