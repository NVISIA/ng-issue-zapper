import { Component } from '@angular/core';
import { Issue } from "./issue";
import { IssueService } from "./issue.service";


@Component({
    selector: 'issue-list',
    templateUrl: './issue-list.component.html',
    styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent {

    public allIssues: Array<Issue>;

    constructor(private issueService: IssueService) {
        this.allIssues = [];
    }

    public ngOnInit() {

        this.issueService.getAllIssues().subscribe(
            (issues: Array<Issue>) => {
            this.allIssues = issues;
        })
    }

}
