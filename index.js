const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const Reddit = require('reddit');
const nlp = require('compromise')


nlp.extend(require('compromise-sentences'))

    



const app = express();





 
app.get('/', (req, res) => {


    const reddit = new Reddit({
        username: 'newsGatherr',
        password: 'tenis10()',
        appId: 'U3FwCy72wcnY1hT0leVY5Q',
        appSecret: 'qQG-Chclqa8AOa44-nNX9LbXj3-tBg',
        userAgent: 'newsGatherer/1.0.0 (http://example.com)'
    })
            
    const twitter = new TwitterApi({
        appKey: 'J55GCcFVwDS4qCO774uYWtHDL',
        appSecret: '96xqKVIO4OND9jXhf4U8gteilKZnPYHPii3JOw4qZBxNF4fL73',
        accessToken: '1485709753342959620-jqRsG7JGHirTOu2LWjMQSa4Nvogtbt',
        accessSecret: 'JIC8gXNHnoZFxt6Y09bFLGAUxJpPk52i8tOKRZwtgAmVJ',
    });
                            
            
    const v2Client = twitter.v2
    const rwClient = v2Client.readWrite


    try{

    reddit.get('/r/Economics/top/.json?f=flair_name%3A"News"', {
        sr: 'WeAreTheMusicMakers',
        kind: 'link',
        resubmit: true,
        title: 'BitMidi – 100K+ Free MIDI files',
        url: 'https://bitmidi.com'
    }).then((res) => {

        let i = 0;
        let limit = 3;
        while(i < limit){

            if(limit >= res.data.children.length) break;

            let child = res.data.children[i];

            i ++;

            
            if(child.data.link_flair_css_class != "news"){
                limit ++;
                continue;
            } 

            let subject = nlp(child.data.title).sentences().subjects().text().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(" ","");
            
            rwClient.tweet(child.data.title + ' #' + subject  + ' #news #economics' + ' ' + child.data.url);


            
        }
    })

    }catch(e){}




    res
        .status(200)
        .send('posted')
        .end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});