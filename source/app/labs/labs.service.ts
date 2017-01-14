import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

@Injectable()
export class LabsService {
    constructor(private http: Http) {
    }

    getLabs(): any {
        return this.http.get("labs.json")
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error LabsService: ', error);
        return Promise.reject(error.message || error);
    }
}
