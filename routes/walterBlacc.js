const Instagram = require('instagram-web-api')
const Reddit = require('reddit');
const express = require('express');
const nlp = require('compromise');

const path = require('path');
const scriptName = path.basename(__filename);
const fileName = scriptName.replace('.js','');

const router = express.Router();

router.get(`/${fileName}`, (req,res) => {

    const instagram = new Instagram({
        username: 'walterblacck',
        password: 'tenis10()'
    }) 
    
    
    const reddit = new Reddit({
        username: 'newsGatherr',
        password: 'tenis10()',
        appId: 'U3FwCy72wcnY1hT0leVY5Q',
        appSecret: 'qQG-Chclqa8AOa44-nNX9LbXj3-tBg',
        userAgent: 'newsGatherer/1.0.0 (http://example.com)'
    })
    
    
    reddit.get('/r/Memes/top/.json?f=flair_name%3A"News"', {
        sr: 'WeAreTheMusicMakers',
        kind: 'link',
        resubmit: true,
        title: 'BitMidi – 100K+ Free MIDI files',
        url: 'https://bitmidi.com'
    }).then((res) => {
    
    
        for(i = 0; i < res.data.children.length; i ++){
            
    
    
            let child = res.data.children[i];
            
    
            if(child.data.url.endsWith("jpg")){

                ;(async () => {
                    const photo = child.data.url

                    let hashtags = [
                        "memes",
                        "breakingbad",
                        "reddit",
                        "funny",
                        "lol",
                        "dailymemes",
                        "offensivememes"

                    ]

                    let subjects = nlp(child.data.title).sentences().subjects().text().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"").toLowerCase()
                    
                    hashtags.push(...subjects.split(" "))
                



                
                    await instagram.login()

                
                    const { media } = await instagram.uploadPhoto({ 
                        photo: photo, 
                        caption: '#memes #dailymemes #offensivememes',//`${child.data.title} . My dealer ${child.data.author} . #${hashtags.join(" #")}`, 
                        post: 'feed' 
                    })
                    console.log(`https://www.instagram.com/p/${media.code}/`)
                })()
    
                break
            }
    
        }
    })


    res
        .status(200)
        .send('posted')
        .end();
})

module.exports = router