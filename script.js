const reservas = [
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 3
    },
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 4
    },
    {
        tipoHabitacion: "suite",
        desayuno: true,
        pax: 2,
        noches: 1
    }
];

class HotelReservations {
    constructor() {
        this._pax = 40;
        this._breakfast = 15
        this._iva = 1.21;

        this._list = [];
        this._typeOfRoom;
        this._subtotal = 0;
        this._total = 0;
    }
  

    calculateAdditionalPerson(additionalPerson) {
        return --additionalPerson * this._pax
    }

    calculateBreakfast(breakfast) {
        switch (breakfast) {
            case true:
                return 15;
            case false:
                return 0;
        }
        return 0;
    }

    get subtotal() {
        return this._subtotal;
    }

    get total() {
        return this._total;
    }

    set internalList(externalList) {
        this._list = externalList;
        this.calculateSubtotal();
        this.calculateTotal();
    }
}

class ParticularReservations extends HotelReservations {
    constructor(){
        super()
        this._standard = 100;
        this._suite = 150;
    }

    calculateRoom(typeOfRoom) {
        switch (typeOfRoom) {
            case 'standard':
                return this._standard;
            case 'suite':
                return this._suite;
        }
        return 0;
    }

    calculateSubtotal() {
        this._subtotal = this._list.reduce((acc, { tipoHabitacion, desayuno, pax, noches }) =>
        acc + (this.calculateRoom(tipoHabitacion) * noches)
        + (this.calculateAdditionalPerson(pax) * noches)
        + (this.calculateBreakfast(desayuno) * noches), 0);
    }

    calculateTotal() {
        this._total = this._subtotal * this._iva;
    }
}

class TourReservations extends HotelReservations {
    constructor() {
        super()
        this._roomOffer = 100;
        this._discount = 0.15;
    }

    calculateSubtotal () {
        this._subtotal = this._list.reduce((acc, { desayuno, pax, noches }) =>
        acc + (this._roomOffer * noches)
        + (this.calculateAdditionalPerson(pax) * noches)
        + (this.calculateBreakfast(desayuno) * noches), 0);
    }

    calculateTotal() {
        this._total = (this._subtotal - (this._subtotal * this._discount)) * this._iva;
    }
}

const particularReservations = new ParticularReservations();
particularReservations.internalList = reservas;

console.log('---------- Particular ----------')
console.log(`Subtotal = ${particularReservations._subtotal.toFixed(2)}€`);
console.log(`Total = ${particularReservations._total.toFixed(2)}€`);

const tourReservations = new TourReservations();
tourReservations.internalList = reservas;

console.log('---------- Tour ----------')
console.log(`Subtotal = ${tourReservations._subtotal.toFixed(2)}€`);
console.log(`Total = ${tourReservations._total.toFixed(2)}€`);
