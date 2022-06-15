import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeScreenComponent} from "./components/welcome-screen/welcome-screen.component";
import {FormsModule} from "@angular/forms";
import {LobbyComponent} from "./components/lobby/lobby.component";
import {HttpClientModule} from "@angular/common/http";
import {MineComponent} from "./components/mine/mine.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    LobbyComponent,
    MineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
