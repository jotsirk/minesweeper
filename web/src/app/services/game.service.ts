import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../components/models/user.model";
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GameService {

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  registerUser(user: User): Observable<any> {
    return this.httpClient.post<User>("http://localhost:8090/api/register-user", user)
  }

}
