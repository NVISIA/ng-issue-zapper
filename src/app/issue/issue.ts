
export class Issue {
    public id: number;
    public title: string;
    public isResolved: boolean;
    public priority: string;
    public type: string;
    public description: string;

    constructor() {
        this.title = "";
        this.isResolved = false;
        this.priority = "Medium";
        this.type = "bug";
        this.description = "";
    }
}
