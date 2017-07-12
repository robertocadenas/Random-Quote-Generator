// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
// event listener to respond start the transition Quotes; The timer is put to 0
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
document.getElementById('loadQuote').addEventListener("click", transitionQuotesOn, false);

var intervalID = setInterval(printQuote, 30000); //init, when you load the page/script
var onceQuote = []; //array to control de number of citations that have one quote
var randomNumber;
var lengthgQuote = quotes.length;

function getRandomQuote() {
  // While() loop to verify that the quote not repeat for a cicle
  while (true) {
    randomNumber = Math.floor( Math.random() * quotes.length );
    //verifyOnce() to verify that the quote (the number with the position in the array associated) doesn't repeat.
    if (verifyOnce(randomNumber)) {
      return quotes[randomNumber]; //exit from the loop === break.
    }
  }
}

function verifyOnce(randomNumber) {
  // Control that the control array is not longer than quoutes;
  // When it is equal the program splice it
  if ( (onceQuote.length ) !== ( lengthgQuote ) ) {
     // indexOf to verify that the randomNumber has not been used before
     var index = onceQuote.indexOf(randomNumber);
     // !== -1 when it has beed used, the program come back to the getRandomQuote ()
     if (index !== -1) {
       return false;
        // else === -1 when it has not beed used, the program push it to the control array
       } else {
         onceQuote.push(randomNumber);
         return true;
         }
         // else the control array is full, te program restart it
     } else {
       onceQuote.splice(0, onceQuote.length); // cleaning, all quotes has been used.
       console.log('------ NEW CICLE OF 6 QUOTES ------'); //control no-repeat the coute
       return false;
   }
}

function printQuote () {
 //Get one quote
 var quote = getRandomQuote();
 //create the html template
 var html =
   '<p class="quote">' + quote.quote + '</p><p class="source">' + quote.source;
 //if to control that the optional properties hace content
 if(quote.citation) {
   html += '<span class="citation">' +  quote.citation + '</span>';
 }
 //if to control that the optional properties hace content
 if(quote.year) {
   html += '<span class="year">' + quote.year + '</span>';
 }
 //if to control that the optional properties hace content
 // And two new classes in the CSS: tagsLine and tags
 if(quote.tags) {
   var tags = quote.tags;
   html += '</p><p class="tagsLine">'
   for (var key in tags ) {
     html += '<span class="tags">' +tags[key] + '</span>';
   }
 }
 html += '</p>';
 //Change the color with each quote
 document.body.style.backgroundColor = randomColor();
 //write the new qoute on the web page
 document.getElementById('quote-box').innerHTML = html;
 console.log(quote.quote); //control no-repeat the coute
}


//randomColor with RGB format rgb(0-255,0-255,0-255)
function randomColor() {
  var codeColor = 'rgb(';
  for (var i=0; i<3; i+=1) { //rgb has 3 parameters
    codeColor += Math.floor( Math.random() * 255 );
    if (i<2) {
      codeColor += ',';
    }
  }
  codeColor += ')';
  return codeColor;
}


function transitionQuotesOn() {
  // First clean the process to create one new with transitionQuotesOff()
  // Don't want two process at the same time.
  // The first time the program cancels the interval that was created with the load of the page.
  // Next time, the program stop intervals that has been trigger with every click in the button.
  transitionQuotesOff();
  intervalID = setInterval(printQuote, 30000); //30 seconds
}

function transitionQuotesOff() {
  clearInterval(intervalID);
}
