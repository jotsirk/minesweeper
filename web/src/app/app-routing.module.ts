import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LobbyComponent} from "./components/lobby/lobby.component";
import {WelcomeScreenComponent} from "./components/welcome-screen/welcome-screen.component";

const routes: Routes = [
  {path: '', component: WelcomeScreenComponent},
  {path: 'lobby', component: LobbyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
