import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Issue} from "./issue";
import {IssueService} from "./issue.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {MatSort} from "@angular/material";


@Component({
  selector: 'issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  public allIssues: Array<Issue>;
  displayedColumns = ['id', 'title', 'type', 'priority', 'resolved'];
  exampleDatabase: ExampleDatabase = null;
  dataSource: ExampleDataSource;
  listFilter: string;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private issueService: IssueService) {
    this.allIssues = [];
    this.exampleDatabase = new ExampleDatabase([]);

  }

  public ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort);

    this.issueService.getAllIssues().subscribe(
      (issues: Array<Issue>) => {
        this.allIssues = issues;
        this.exampleDatabase.changeIssues(issues);
      });

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}

export class ExampleDatabase {
  dataChange: BehaviorSubject<Issue[]>;

  get data(): Issue[] {
    return this.dataChange.value;
  }

  constructor(data) {
    this.dataChange = new BehaviorSubject<Issue[]>(data);
  }

  public addIssue(issue) {
    const copiedData = this.data.slice();
    copiedData.push(issue);
    this.dataChange.next(copiedData);
  }

  public changeIssues(issues) {
    this.dataChange.next(issues);
  }
}

export class SimpleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  connect(): Observable<Issue[]> {
    return this._exampleDatabase.dataChange;
  }

  disconnect() {
  }
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase, private _sort: MatSort) {
    super();
  }

  connect(): Observable<Issue[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
      this._sort.sortChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  getSortedData(): Issue[] {
    const data = this._exampleDatabase.data.slice().filter((item: Issue) => {
      let searchStr = (item.title + item.owner).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'priority': [propertyA, propertyB] = [a.priority, b.priority]; break;
        case 'type': [propertyA, propertyB] = [a.type, b.type]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  disconnect() {}
}

/*
Behavior subject is a special kind of a subject but it has an initial value unlike subjects.
It needs an initial value as it must always return a value on subscription even if it hasn’t received a next()
Rx.subject() subscription won’t get anything initially
Rx.behaviorsubject(‘a’) subscription get ‘a’ initially
 */
