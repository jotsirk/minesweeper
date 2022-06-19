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

  getGameroomUsers(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/api/get-users")
  }

  getMinefield(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/get-minefield')
  }
}
