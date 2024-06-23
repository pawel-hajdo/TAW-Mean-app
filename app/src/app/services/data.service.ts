import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3100/api';

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get(this.url + '/posts');
  }

  public getById(id: string){
    return this.http.get(this.url + '/post/' +id);
  }

}
