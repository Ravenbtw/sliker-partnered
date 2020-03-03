const request = require('request');
const Twitter = require('twitter');

let no = ['Nope.', 'Nah.', 'Not yet.', 'Maybe another day.', 'Probably not.', 'N OMEGALUL', 'Not today.', 'Uh, no.', 'Not really.', 'OH NYOO! widepeepoSad', 'Nah.', 'Meh.', 'Yeah, no.', 'нет', 'Still no.', 'Maybe tomorrow.']; // Rare tweet list

let yes = `He finally did it. @Sliker is now a Twitch Partner! PogU

https://twitch.tv/itssliker`; // Partner tweet

let client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
}); // Apply for a Twitter Developer account and make an application to get this info. (https://developer.twitter.com/en/apply-for-access)

let clientId = ''; // Get this by making a Twitch application on the Developer console. (https://dev.twitch.tv/console)

let slikerInterval = setInterval(() => {
  request({
    url: 'https://api.twitch.tv/helix/users?login=itssliker',
    headers: {
      'Client-ID': clientId
    },
    json: true
  }, (error, response, body) => {
    let currentTime = new Date();
    let randomInt = Math.floor(Math.random() * 5); // Choose a random number between 0 and 4
    console.log(currentTime.getHours(), currentTime.getMinutes());
    console.log(no.length);
    console.log(randomInt);
    if (!error && body && body.data && body.data[0] && body.data[0] && body.data[0].broadcaster_type) {
      if (body.data[0].broadcaster_type == 'partner') { // If Sliker is partnered
        clearInterval(slikerInterval); // Stop checking
        client.post('statuses/update', {status: yes}); // Post tweet
      } else if (body.data[0].broadcaster_type == 'affiliate' && currentTime.getHours() == 15 && currentTime.getMinutes() == 0) { // If Sliker is affiliate and time is 15:00
        if (randomInt == 0) { // If the randomly chosen number is 0
          client.post('statuses/update', {status: no[Math.floor(Math.random() * no.length)]}); // Post a random tweet from the no list
        } else {
          client.post('statuses/update', {status: 'No.'}); // Post normal tweet
        }
      }
    }
  });
}, 1000*60); // Check status every 60 seconds 