const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count =document.getElementById('count');
const total =document.getElementById('total');
const movieSelect = document.getElementById('movie')
let ticketPrice = +movieSelect.value;
//console.log(movieSelect.selectedIndex)

populateUi();

//set movie name and price to local Storage
function setMovieData(movieIndex,price){
    localStorage.setItem('movieName',movieIndex);
    localStorage.setItem('price',price);
}

//Update the seat to selected class and store the seat index to local storage
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatCount=selectedSeats.length;
    const seatIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    })


   // console.log(seatIndex)
    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));
    
    count.innerText = selectedSeatCount;
    total.innerText  = selectedSeatCount * ticketPrice*76.52;
}  

function populateUi(){
     const localseat=JSON.parse(localStorage.getItem('selectedSeats'));
     //console.log(typeof localseat);
     if(localseat){
         seats.forEach((seat,index)=>{
             if(localseat.indexOf(index)>-1){
                 seat.classList.add('selected');
             }
             const localMovieIndex = localStorage.getItem('movieName')
             if(localMovieIndex !== null){
                 movieSelect.selectedIndex=localMovieIndex;
             }
         })
     }
}
function resetCount(){
    count.innerText = "0";
    total.innerText  = "0";
}
function resetLocalStorage(){
    localStorage.clear();
}

// movie select event
movieSelect.addEventListener('change',e =>
{
    ticketPrice = +e.target.value;
    setMovieData( e.target.selectedIndex,e.target.value);
    updateSelectedCount()
});  


// Seat Click event
 container.addEventListener('click', e => {
     if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
         e.target.classList.toggle('selected');
         updateSelectedCount();
     }
 

    })
    updateSelectedCount();


    //Reset Button
    function Reset(){
        
        seats.forEach((seat,index)=>{
            
                seat.classList.remove('selected');
            })
            resetCount();
            resetLocalStorage();
          
        
    }
    