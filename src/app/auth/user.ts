export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public roles: Array<string>;
    public userName: string;

    constructor() {
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.roles = [];
        this.userName = "";
    }
}
