export class User {
    id: number;
    name: string;
    gender: string;
    membership: string;
    price: number;
    status: boolean;
    

    constructor(id: number, name: string, gender: string, membership: string, price: number, status: boolean, ) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.membership = membership;
        this.price = price;
        this.status = status ;
        
    }
}