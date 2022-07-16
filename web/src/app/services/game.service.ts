import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../components/models/user.model";
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GameService {

  baseUrl: String = "http://localhost:8090";

  constructor(private httpClient: HttpClient) {
  }

  registerUser(user: User): Observable<any> {
    return this.httpClient.post<User>(this.baseUrl + "/api/register-user", user);
  }

  loadGame(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/api/load-game")
  }

  getGameroomUsers(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/api/get-users");
  }

  getMinefield(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/get-minefield');
  }

  registerMineClick(mineCoordinates: number[]): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/register-mine-click', mineCoordinates);
  }

  registerFlagClick(mineCoordinates: number[]): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/register-flag-click', mineCoordinates);
  }
}
