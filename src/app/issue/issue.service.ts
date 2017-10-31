import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Issue } from "./issue";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class IssueService {

    constructor(private http: Http, private authService: AuthService) {
    }

    public getAllIssues(): Observable<Array<Issue>> {
        return this.http.get("/api/issue")
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getIssue(id: number): Observable<Issue> {

        if (!id || id <= 0) {
            return Observable.of(new Issue());
        }

        return this.http.get("/api/issue/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public createIssue(issue: Issue): Observable<Issue> {


        return this.http.post("/api/issue", (issue), this.authService.tokenHeader)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public updateIssue(issue: Issue): Observable<Issue> {


        return this.http.put("/api/issue/" + issue.id, (issue), this.authService.tokenHeader)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public deleteIssue(issue: Issue): Observable<Issue> {


        return this.http.delete("/api/issue/" + issue.id, this.authService.tokenHeader)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response): Array<Issue> {
        let body = res.json();
        return body || [];
    }

    private handleError(error: Response | any) {
        console.log(error);
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
