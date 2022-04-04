const router = require('express').Router();
const passport = require('passport');
const request = require("request");
// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});
const {google} = require('googleapis');
// auth with google+
router.get("/test",(req,res,next)=>{
    
    const oauth2Client = new google.auth.OAuth2(
        '228010455349-aoubftmprmmdq1a48hcse6ehdnd3ccia.apps.googleusercontent.com',
        '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',
        'http://localhost:3000/auth/google/redirect'
    );
    const scopes=  ['https://www.googleapis.com/auth/fitness.activity.read profile']
    const url = oauth2Client.generateAuthUrl({
        access_type:'offline',
        scope:scopes,
        state:JSON.stringify({
            callbackUrl:req.body.callbackUrl,
            userID:req.body.userid
        })
    })
    request(url,(err,response,body)=>{
        res.send({url} )
    })
})

// callback route for google to redirect to
router.get('/google/redirect',async(req, res) => {
   const queryUrl = new urlParse(req.url);
   const code = queryUrl.parse(queryUrl.query).code;

   const oauth2Client = new google.auth.OAuth2(
        '228010455349-aoubftmprmmdq1a48hcse6ehdnd3ccia.apps.googleusercontent.com',
        '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',
        'http://localhost:3000/auth/google/redirect'
    );
    const tokens = await oauth2Client.getToken(code);
    console.log(tokens);
});

module.exports = router;
