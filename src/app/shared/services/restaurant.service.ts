import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root',
  })

export class RestaurantService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
    getRestruants() {
        return this.http.get('/api/restaurants');
    }

    getRestruantById(id:string) {
        return this.http.get('/api/restaurants/'+id);
    }

    deleteRestruant(id:string) {
        return this.http.delete('/api/restaurants/'+id);
    }

    createRestruant(data) {
        return this.http.post('/api/restaurants',data);
    }

    updateRestruant(id,data) {
        return this.http.put('/api/restaurants/'+id,data);
    }

    downloadRestaurantTemplate():Observable<Blob> {
        //return this.http.get('/api/restaurants');
        return this.http.get('api/restaurants/template/download', { responseType: 'blob' });
    }
}