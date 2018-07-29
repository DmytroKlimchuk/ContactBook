interface IBook {
    id: number;
    surname: string;
    name: string;
    country: string;
    city: string;
    email: string;
    mobile: number;
    company: string;
}

export class Book implements IBook {

    constructor (
        public id: number,
        public surname: string,
        public name: string,
        public country: string,
        public city: string,
        public email: string,
        public mobile: number,
        public company: string
    ) {}

}
