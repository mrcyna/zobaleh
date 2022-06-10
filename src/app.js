const {Twitter} = require('./twitter');

require('dotenv').config();

(async () => {
    const twitter = new Twitter(
        process.env.CONSUMER_KEYS_API_KEY,
        process.env.CONSUMER_KEYS_API_KEY_SECRET,
        process.env.AUTHENTICATION_TOKENS_ACCESS_TOKEN,
        process.env.AUTHENTICATION_TOKENS_ACCESS_TOKEN_SECRET,
    );

    await twitter.boot();

    /*
    Examples:
    await twitter.tweet('Hello World!');
    await twitter.lastTweet();
    await twitter.deleteTweet('1535377125800288256');
    await twitter.likedTweets();
    await twitter.unlikeTweet('1496968759285895172');
    await twitter.followers('M4SS1PFL079HEZZZ');
    */

    /*while (true) {
        for (const tweet of await twitter.likedTweets()) {
            if (await twitter.unlikeTweet(tweet.id)) {
                console.log(`✅ Tweet with ID ${tweet.id} has been unliked successfully.`);
            } else {
                console.log(`⛔️ Tweet with ID ${tweet.id} has been failed to be unliked.`);
            }
            await new Promise(r => setTimeout(r, process.env.PAUSE_DURATION));
        }
    }*/

    /*while (true) {
        const tweet = await twitter.lastTweet();
        if (await twitter.deleteTweet(tweet.id)) {
            console.log(`✅ Tweet with ID ${tweet.id} has been deleted successfully.`);
        } else {
            console.log(`⛔️ Tweet with ID ${tweet.id} has been failed to be deleted.`);
        }
        await new Promise(r => setTimeout(r, process.env.PAUSE_DURATION));
    }*/
})();
