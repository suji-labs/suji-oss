var crypto = require('crypto');

exports.do_ciper = function(inputpass)
{
    var salt = "aslkdjaskdhaskjdasldasjlkdjaskldjaklsdklassaidasjnd";
    var iterations = 300;
    var keylen = 24;

    var derivedKey = crypto.pbkdf2Sync(inputpass, salt, iterations, keylen);
    var pw = Buffer(derivedKey, 'binary').toString('hex');

    return pw;
};
