import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeScreenComponent} from "./components/welcome-screen/welcome-screen.component";
import {FormsModule} from "@angular/forms";
import {LobbyComponent} from "./components/lobby/lobby.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
