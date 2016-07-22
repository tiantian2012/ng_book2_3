import { bootstrap }    from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
// import { HTTP_PROVIDERS,XHRBackend } from '@angular/http';
if (process.env.ENV === 'production') {
  enableProdMode();
}
// bootstrap(AppComponent, [
//   APP_ROUTER_PROVIDERS,
//   HTTP_PROVIDERS,
//   {provide:XHRBackend,useClass:InMemoryBackendService},
//   {provide:SEED_DATA,useClass:InMemoryDataService}
// ]);
bootstrap(AppComponent);
