import { Authority } from "./authority.model";

export class User{

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public googleSub: string,
        public password: string,
        public enabled: number,
        public authorities: [Authority]
       ){}

       public isAdmin(): boolean{
           let admin: Authority = this.authorities.find(authority => authority.name == 'ROLE_ADMIN');
           return admin ? true : false;
       }

}