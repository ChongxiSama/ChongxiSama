const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = '76561199634347036';

export const getSteamStatus = async () => {
    if (!STEAM_API_KEY) return { personastate: 0 };

    try {
        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`;
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) return { personastate: 0 };

        const data = await response.json();
        const player = data.response?.players?.[0];
        if (!player) return { personastate: 0 };
        
        return {
            personastate: player.personastate,
            gameextrainfo: player.gameextrainfo,
            gameid: player.gameid,
            avatar: player.avatarfull,
            personaname: player.personaname
        };
    } catch {
        return { personastate: 0 };
    }
};

export const getRecentlyPlayed = async () => {
    if (!STEAM_API_KEY) return [];

    try {
        const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`;
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) return [];

        const data = await response.json();
        const games = data.response?.games;
        if (!games) return [];

        return games.slice(0, 3).map((game: any) => ({
            appid: game.appid,
            name: game.name,
            playtime_2weeks: game.playtime_2weeks,
            icon_url: `https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
        }));
    } catch {
        return [];
    }
};
