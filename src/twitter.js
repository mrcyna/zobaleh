const {TwitterApi} = require('twitter-api-v2');

class Twitter {
    constructor(apiKey, apiKeySecret, accessToken, accessTokenSecret) {
        this.apiKey = apiKey;
        this.apiKeySecret = apiKeySecret;
        this.accessToken = accessToken;
        this.accessTokenSecret = accessTokenSecret;
    }

    client() {
        return new TwitterApi({
            appKey: this.apiKey,
            appSecret: this.apiKeySecret,
            accessToken: this.accessToken,
            accessSecret: this.accessTokenSecret,
        });
    }

    async boot() {
        this.user = await this.userInfo();
    }

    async userInfo() {
        const result = await this.client().v2.me();
        return result.data;
    }

    async tweet(text) {
        const result = await this.client().v2.tweet(text);
        return result.data.text === text;
    }

    async lastTweet() {
        const timeline = await this.client().v2.userTimeline(this.user.id);
        const result = await this.client().v2.tweets(timeline.meta.newest_id);

        return result.data[0];
    }

    async deleteTweet(id) {
        const result = await this.client().v2.deleteTweet(id);
        return result.data.deleted;
    }

    async likedTweets() {
        const result = await this.client().v2.userLikedTweets(this.user.id);
        return result.data.data;
    }

    async unlikeTweet(id) {
        const result = await this.client().v2.unlike(this.user.id, id);
        return result.data.liked === false;
    }

    async followers(pagination_token) {
        if (pagination_token !== '') {
            return await this.client().v2.followers(this.user.id, {pagination_token});
        } else {
            return await this.client().v2.followers(this.user.id);
        }
    }
}

module.exports = {
    Twitter
};