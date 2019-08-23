export class User {
    public id?: number;
    public username: string;
    public password: string;
    public email: string;
    public admin: boolean;

    constructor(id: number | undefined, username: string, password: string, email: string, admin: boolean) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.admin = admin;
    }
}
