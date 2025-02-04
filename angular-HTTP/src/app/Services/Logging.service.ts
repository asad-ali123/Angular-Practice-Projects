import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class LoggingService {
    http: HttpClient = inject(HttpClient)
    logError(data: { statusCode: number, errorMessage: string, dateTime: Date }) {
        this.http.post('https://angularhttp-89e90-default-rtdb.firebaseio.com/logerror.json', data).subscribe();
    }

    fetchError() {
        this.http.get('https://angularhttp-89e90-default-rtdb.firebaseio.com/logerrorr.json').subscribe((data) => console.log(data))
    }
}