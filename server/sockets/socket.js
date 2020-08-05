const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextTicket();
        console.log(next);
        callback(next);
    });

    client.emit('currentTicket', {
        current: ticketControl.getCurrentTicket(),
        lastTickets: ticketControl.getLastTickets()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'El escritorio es necesario en la URL'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desktop);
        callback(attendTicket);

        // Update lastTickets
        client.broadcast.emit('lastTickets', {
            lastTickets: ticketControl.getLastTickets()
        });
    });
});