import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ]
});