var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('currentTicket', function(data) {
    updateScreen(data.lastTickets);
});

socket.on('lastTickets', function(data) {
    updateScreen(data.lastTickets);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
});

function updateScreen(lastTickets) {
    for (let index = 0; index < lastTickets.length; index++) {
        lblTickets[index].text('Ticket ' + lastTickets[index].number);
        lblEscritorios[index].text('Escritorio ' + lastTickets[index].desktop);
    }
}