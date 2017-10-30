import { Component, Input } from '@angular/core';
import { Issue } from "./issue";
import { Router } from '@angular/router';
import { IssueService } from "./issue.service";

@Component({
    selector: 'issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.css']
})
export class IssueComponent {

    @Input()
    public issue: Issue;

    constructor(
        private issueService: IssueService,
        private router: Router) {
        this.issue = new Issue();
    }

    public commandResolveIssue(issue: Issue) {
        issue.isResolved = true;

        this.issueService.updateIssue(issue).subscribe(
            (itemDone: any) => {
                console.log(itemDone);
            }, () => {
                issue.isResolved = false;
                console.log("fail");
            }
        );

    }

    public commandEditIssue(issue: Issue) {
        this.router.navigate(['/issue', issue.id]);
    }

    public getDecorationForIssue(issue: Issue) {
        if (issue.isResolved) {
            return "line-through";
        }
        return "none";
    }
}
