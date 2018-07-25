// - Прізвище (обов'язкове поле)
// - ім'я (обов'язкове поле)
// - країна
// - місто
// - email (обов'язкове поле)
// - номер телефону (обов'язкове поле)
// - місце роботи (назва компанії)

interface IBook {
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
        public surname: string,
        public name: string,
        public country: string,
        public city: string,
        public email: string,
        public mobile: number,
        public company: string
    ) {}

}
