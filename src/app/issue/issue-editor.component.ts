import { Component, Output, EventEmitter } from '@angular/core';
import { Issue } from "./issue";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IssueService } from "./issue.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'issue-editor',
    templateUrl: './issue-editor.component.html',
    styleUrls: ['./issue-editor.component.css']
})
export class IssueEditorComponent {

    @Output()
    public newIssue: EventEmitter<Issue>;
    public priorities = ["Low", "Medium", "High"];

    public issueForm = new FormGroup({
        id: new FormControl(),
        isResolved: new FormControl(false),
        title: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])),
        priority: new FormControl('Medium', Validators.required),
        type: new FormControl('bug', Validators.required),
        description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(250)]))
    });

    public constructor(
        private issueService: IssueService,
        private route: ActivatedRoute,
        private location: Location) {
        this.newIssue = new EventEmitter<Issue>();
    }

    public commandSaveIssue(issue: Issue) {

        if (issue.id) {
            this.issueService.updateIssue(issue).subscribe(
                (itemDone: any) => {
                    console.log(itemDone);
                }, () => {
                    console.log("fail");
                }
            );
        } else {
            delete issue.id;
            this.issueService.createIssue(issue).subscribe(
                (itemDone: any) => {
                    console.log(itemDone);
                    this.newIssue.emit(issue);
                }, () => {
                    console.log("fail");
                }
            );
        }

        // this.issueForm.reset({ title: "", priority: "Medium", type: "bug", description: ""});
    }

    public commandGoBack() {
        this.location.back();
    }

    public ngOnInit(): void {
        this.route.paramMap
            .switchMap(
            (params: ParamMap) => this.issueService.getIssue(+params.get('id')))
            .subscribe(issue => { this.issueForm.reset(issue); });
    }
}
