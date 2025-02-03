import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class LoggingService{
    http : HttpClient  =inject(HttpClient)
    logError(){}

    fetchError(){}
}