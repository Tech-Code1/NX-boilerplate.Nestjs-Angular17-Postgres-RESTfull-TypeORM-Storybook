import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './login/components/login/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
