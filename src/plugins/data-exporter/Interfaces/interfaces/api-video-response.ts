// {
//     "videoId": "vi367t2xkfaTy3gOAJrpPkVk",
//     "createdAt": "2024-07-23T23:52:39.000Z",
//     "title": "My video",
//     "description": "",
//     "publishedAt": "2024-07-23T23:52:39.000Z",
//     "updatedAt": "2024-07-23T23:52:39.000Z",
//     "tags": [],
//     "metadata": [],
//     "source": {
//         "uri": "/videos/vi367t2xkfaTy3gOAJrpPkVk/source",
//         "type": "upload"
//     },
//     "assets": {
//         "hls": "https://vod.api.video/vod/vi367t2xkfaTy3gOAJrpPkVk/hls/manifest.m3u8",
//         "iframe": "<iframe src=\"https://embed.api.video/vod/vi367t2xkfaTy3gOAJrpPkVk\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allowfullscreen=\"true\"></iframe>",
//         "player": "https://embed.api.video/vod/vi367t2xkfaTy3gOAJrpPkVk",
//         "thumbnail": "https://vod.api.video/vod/vi367t2xkfaTy3gOAJrpPkVk/thumbnail.jpg",
//         "mp4": "https://vod.api.video/vod/vi367t2xkfaTy3gOAJrpPkVk/mp4/source.mp4"
//     },
//     "_public": true,
//     "panoramic": false,
//     "mp4Support": true
// }

// Interface for the response from the API
export interface ApiVideoResponse {
    videoId: string;
    createdAt: string;
    title: string;
    description: string;
    publishedAt: string;
    updatedAt: string;
    tags: string[];
    metadata: string[];
    source: {
        uri: string;
        type: string;
    };
    assets: {
        hls: string;
        iframe: string;
        player: string;
        thumbnail: string;
        mp4: string;
    };
    _public: boolean;
    panoramic: boolean;
    mp4Support: boolean;
}

