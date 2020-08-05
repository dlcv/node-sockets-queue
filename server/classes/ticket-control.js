const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastTickets = [];
        let data = require('../data/data.json');
        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastTickets = data.lastTickets;
        } else {
            this.restartCount();
        }
    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();
        return `Ticket ${this.last}`;
    }

    getCurrentTicket() {
        if (this.last !== 0) {
            return `Ticket ${this.last}`;
        } else {
            return `No hay nadie en espera`;
        }
    }

    getLastTickets() {
        return this.lastTickets;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'No hay tickets pendientes';
        }

        let numberTicket = this.tickets[0].number;
        this.tickets.shift();

        let attendedTicket = new Ticket(numberTicket, desktop);
        this.lastTickets.unshift(attendedTicket);

        if (this.lastTickets.length > 4) {
            this.lastTickets.splice(-1, 1);
        }

        this.saveFile();
        return attendedTicket;
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.lastTickets = [];
        console.log('Sistema inicializado');
        this.saveFile();
    }

    saveFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastTickets: this.lastTickets
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}