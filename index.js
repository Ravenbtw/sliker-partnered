const request = require('request');
const Twitter = require('twitter');

let no = ['Nope.', 'Nah.', 'Not yet.', 'Maybe another day.', 'Probably not.', 'N OMEGALUL', 'Not today.', 'Uh, no.', 'Not really.', 'OH NYOO! widepeepoSad', 'Nah.', 'Meh.', 'Yeah, no.', 'нет', 'Still no.', 'Maybe tomorrow.'];

let yes = `He finally did it. @Sliker is now a Twitch Partner! PogU

https://twitch.tv/itssliker`

var client = new Twitter({
  consumer_key: 'wYFzbUpIn1GMjWqQudo3vmd0p',
  consumer_secret: '1zqGYcGC3XPh0VsIzds6KveQq0LLvx3JCCWECTE4n8ZCdaFN3I',
  access_token_key: '1201190116565368832-FoAROm07IEdFy35gxbzCcflx8N6K0K',
  access_token_secret: 'DZSmsjre27EkdRWudjWv97GoosTUtO6hUq2yv18ad4TOv'
});

let slikerInterval = setInterval(() => {
  request({
    url: 'https://api.twitch.tv/helix/users?login=itssliker',
    headers: {
      'Client-ID': 'btw06d28yj0r2c0tvh8glpsx0zydhl'
    },
    json: true
  }, (error, response, body) => {
    let currentTime = new Date();
    let randomInt = Math.floor(Math.random() * 10);
    console.log(currentTime.getHours(), currentTime.getMinutes());
    console.log(no.length);
    console.log(randomInt);
    if (body.data[0].broadcaster_type == 'partner') {
      clearInterval(slikerInterval);
      client.post('statuses/update', {status: yes});
    } else if (body.data[0].broadcaster_type == 'affiliate' && currentTime.getHours() == 15 && currentTime.getMinutes() == 0) {
      if (randomInt == 0) {
        client.post('statuses/update', {status: no[Math.floor(Math.random() * no.length)]});
      } else {
        client.post('statuses/update', {status: 'No.'});
      }
    }
  });
}, 1000*60);
