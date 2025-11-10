import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'gest-pro-7d600',
        appId: '1:843063877155:web:bd28ab6bf6b86eaebe9b96',
        storageBucket: 'gest-pro-7d600.firebasestorage.app',
        apiKey: 'AIzaSyAcqRvwuMLxQBS5OIGjLvtE7dXFeWaLJGM',
        authDomain: 'gest-pro-7d600.firebaseapp.com',
        messagingSenderId: '843063877155',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
});
