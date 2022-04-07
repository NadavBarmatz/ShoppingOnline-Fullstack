import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {

    private notification = new Notyf({ position: { x: "center", y: "top" }, duration: 4000 });

    public success(msg: string) {
        this.notification.success(msg);
    }

    public error(err: any) {
        const msg = this.getMessage(err);
        this.notification.error(msg);
    }

    private getMessage(err: any): string {

        console.log(err);
        
        if(typeof err === "string") return err;

        if(typeof err.error === "string") return err.error; // HttpClient string error

        if(Array.isArray(err.error)) return err.error[0]; // HttpClient array of errors

        if(typeof err.message === "string") return err.message;

        return "Some error, please try again.";
    }

}
