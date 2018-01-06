import { Injectable } from '@angular/core';
import { Position } from './position';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PositionService {

  constructor(private http: HttpClient) { }

  getPositions() : Observable<Position[]>{
    return this.http.get<Position[]>("http://localhost:8081/positions");
  }

  getPosition(id) : Observable<Position[]>{
    return this.http.get<Position[]>("http://localhost:8081/position/" + id);
  }

  savePosition(position: Position): Observable<any> {  
    return this.http.put<any>("http://localhost:8081/position/" + position._id, position);
}
  
}
