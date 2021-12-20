/* ONLOAD PAGE */
// get tweet list of the current logged in user 
// determine number of tweets and update id=number-tweets innerText 
// read tweet list and build id=tweets-list by prepend each tweet div ( s.t.  recent first )


// prep 
const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('email');
const userData = JSON.parse(localStorage.getItem(userEmail));
let tweets = [];
let slug = userData.slug;
let userName = userData.name;

/* onload */ 
// 1. get list of user tweets and display it
// 2. get user name and display it 
window.onload = () => {  
    tweets =  JSON.parse(localStorage.getItem( slug ));
    for ( let i = 0; i < tweets.length; i++) {
        prependNewTweet( tweets[i]['date'], tweets[i]['content'])
    }

    const namesDiv = document.querySelectorAll('.user-name'); 
    namesDiv.forEach( ( nameDiv ) => {
        nameDiv.innerHTML = userName; 
    })
}


// given a new tweet data, this function should 
// create a new tweet div and add it as first child to id=tweets-list 
// update tweets number counter id=number-tweets
function prependNewTweet(tweetDate, tweetContent) {
    // build new tweet div 
    let newTweetDiv = document.createElement('div');
    newTweetDiv.classList.toggle('tweet-box');
    /*
                <div class="tweet-box">
                    <div>
                        <span>Date: </span>
                        <span id="tweet-date"> $ </span>
                    </div>
 
                    <div class="tweet-content">
                        $
                    </div>
                    <hr>    
                </div>
    */
    newTweetDiv.innerHTML =
        ` 
             <div style="margin:5px;">
                 <span>Date: </span>
                 <span id="tweet-date"> ${tweetDate} </span>
             </div>
             <div class="tweet-content">
                 ${tweetContent}
             </div>
             `;


    // append new tweet div as first child 
    document.getElementById('tweets-list').prepend(newTweetDiv);

    // // update number of tweets 
    let tweetsNumber = Number(document.getElementById('number-tweets').innerText);
    document.getElementById('number-tweets').innerText = (tweetsNumber + 1);
}



// store the tweet info to Local storage 
    // ?
// pop the new tweet to the list ot the tweet tist 
    // 1. select tweet text area 
    // 2. get tween text 
    // 3. construct a new tweet box 
    // 4. add it to the top of the tweet list 
function handleTweet() {

    let tweetTextArea = document.getElementById('new-tweet-box-content');
    let tweetContent = tweetTextArea.value;

    // don't accept empty tweet 
    if ( isTweetEmpty(tweetContent) ) return; 

    // get current date and time
    let curDate = new Date().toLocaleDateString();
    let curTime = new Date().toLocaleTimeString();
    let curTimeDate = curTime + ' ' + curDate;

    
    prependNewTweet( curTimeDate, tweetContent );

    // clear tweet area 
    tweetTextArea.value = '';

    // update local storage
    let tweetObject = { 'date': curTimeDate, 'content': tweetContent};

    tweets.push( tweetObject );

    localStorage.setItem( slug, JSON.stringify( tweets) );
}







// When user click id="tweet-button", focus should go to new tweet content textarea id="new-tweet-box-content"
function focusNewTweetBox(){
  document.getElementById('new-tweet-box-content').focus(); 
}


// tweet validation 

// do not allow empty tweets, i.e. tweets with whitespace only
function isTweetEmpty( tweetContent) {
    return !( /\S/.test( tweetContent ) );
}

// do not allow user to type in new-tweet box if the tweet is too long ('maxTweetLen' char). ex 50 char
function controlTweetLength() {
    const maxTweetLen = 50; 

    let newTweetTextArea = document.getElementById('new-tweet-box-content');
    let newTweetSubmitButton = document.getElementById('new-tweet-box-submit');
    let longTweetWarning = document.getElementById('tweet-too-long-warning'); 
    
    let tweetLen = newTweetTextArea.value.length;

    if ( tweetLen <= maxTweetLen ) { 
        longTweetWarning.innerHTML = '';
        newTweetSubmitButton.disabled = false; 
    }
    else {
        longTweetWarning.innerHTML = 'Tweet is too long!'.fontcolor('red');
        newTweetSubmitButton.disabled = true; 
    }
}


