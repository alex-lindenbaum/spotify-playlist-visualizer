const querystring = require('querystring');
const request = require('request');

const AUTH_ENCODED = new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64');

module.exports = {
    signin: (req, res) => {
        const query = querystring.stringify({
            client_id: process.env.CLIENT_ID,
            response_type: 'code',
            redirect_uri: process.env.REDIRECT_URI,
            scope: 'playlist-read-collaborative,playlist-modify-private,playlist-modify-public,playlist-read-private',
            show_dialog: true
        });

        res.redirect('https://accounts.spotify.com/authorize?' + query);
    },

    callback: (req, res) => {
        if (req.query.error) {
            // TODO: Access Denied error
            res.status(401).json({ error: req.query.error });
        } else {
            const options = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    grant_type: 'authorization_code',
                    code: req.query.code,
                    redirect_uri: process.env.REDIRECT_URI
                },
                headers: {
                    Authorization: 'Basic ' + AUTH_ENCODED
                },
                json: true
            };

            request.post(options, (error, response, body) => {
                const query = querystring.stringify(body);
                res.redirect(process.env.CLIENT_URI + '/setup?' + query);
            });
        }
    },

    refresh: (req, res) => {
        const options = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                grant_type: 'refresh_token',
                refresh_token: req.query.refreshToken
            },
            headers: {
                Authorization: 'Basic ' + AUTH_ENCODED
            },
            json: true
        };

        request.post(options, (error, response, body) => {
            res.status(200).json({ accessToken: body.access_token });
        })
    }
};