const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

const PLAYER_SUMMARY_ENDPOINT = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`;

export const getSteamStatus = async () => {
    const response = await fetch(PLAYER_SUMMARY_ENDPOINT, {
        next: {
            revalidate: 60
        }
    });
    
    if (!response.ok) {
        return { isPlaying: false, error: true };
    }

    const data = await response.json();
    const player = data.response.players[0];

    if (!player) {
        return { isPlaying: false, error: true };
    }
    
    return {
        personastate: player.personastate,
        gameextrainfo: player.gameextrainfo,
        gameid: player.gameid,
        avatar: player.avatarfull,
        personaname: player.personaname,
        lastlogoff: player.lastlogoff
    };
};