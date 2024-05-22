/* eslint-disable no-use-before-define */
import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';

export class FirebaseInstance {
  private static _instance: FirebaseInstance;

  private constructor() {
    return initializeApp({
      credential: admin.credential.cert({
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        projectId: process.env.FIREBASE_PROJECT_ID,
      } as Partial<admin.ServiceAccount>),
      databaseURL: process.env.FIREBASE_DATABASE_URL!,
    });
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
