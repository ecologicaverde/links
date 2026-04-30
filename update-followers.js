const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const followersFile = path.join(__dirname, 'followers.json');

let followers = {
    twitter: '4698',
    instagram: '1281',
    threads: '42',
    tiktok: '146',
    facebook: '20',
    discord: '58329',
    lastUpdated: new Date().toISOString()
};

async function fetchTwitterFollowers() {
    try {
        const response = await axios.get('https://x.com/Ecologica3Verde', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });
        const $ = cheerio.load(response.data);
        const text = $('body').text();
        const match = text.match(/([\d,.]+)\s+Followers/);
        if (match && match[1]) {
            return match[1].replace(/,/g, '');
        }
    } catch (error) {
        console.error('Erro ao buscar Twitter:', error.message);
    }
    return null;
}

async function fetchInstagramFollowers() {
    try {
        const response = await axios.get('https://www.instagram.com/ecologicaverde/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });
        const html = response.data;
        const match = html.match(/"edge_followed_by":\{"count":(\d+)\}/);
        if (match && match[1]) {
            return match[1];
        }
    } catch (error) {
        console.error('Erro ao buscar Instagram:', error.message);
    }
    return null;
}

async function fetchThreadsFollowers() {
    try {
        const response = await axios.get('https://www.threads.net/@ecologicaverde', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });
        const html = response.data;
        const match = html.match(/(\d+)\s*seguidores/);
        if (match && match[1]) {
            return match[1];
        }
    } catch (error) {
        console.error('Erro ao buscar Threads:', error.message);
    }
    return null;
}

async function fetchTikTokFollowers() {
    try {
        const response = await axios.get('https://www.tiktok.com/@ecologica2verde', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });
        const html = response.data;
        const match = html.match(/"followerCount":(\d+)/);
        if (match && match[1]) {
            return match[1];
        }
    } catch (error) {
        console.error('Erro ao buscar TikTok:', error.message);
    }
    return null;
}

async function fetchFacebookFollowers() {
    try {
        const response = await axios.get('https://www.facebook.com/ecologica2verde', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });
        const html = response.data;
        const match = html.match(/(\d+)\s*seguidores/);
        if (match && match[1]) {
            return match[1];
        }
    } catch (error) {
        console.error('Erro ao buscar Facebook:', error.message);
    }
    return null;
}

async function fetchDiscordMembers() {
    try {
        const response = await axios.get('https://discord.com/api/v9/invites/ZPbzpcPwFf?with_counts=true', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });
        if (response.data && response.data.approximate_member_count) {
            return response.data.approximate_member_count.toString();
        }
    } catch (error) {
        console.error('Erro ao buscar Discord via API:', error.message);
    }
    
    try {
        const response = await axios.get('https://www.google.com/search?q=discord+ecologica+verde+members', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });
        const html = response.data;
        const match = html.match(/(\d+)\s*members/);
        if (match && match[1]) {
            return match[1];
        }
    } catch (error) {
        console.error('Erro ao buscar Discord via Google:', error.message);
    }
    
    return null;
}

async function updateAllFollowers() {
    console.log('Iniciando atualização de seguidores...');
    
    const twitterFollowers = await fetchTwitterFollowers();
    if (twitterFollowers) {
        followers.twitter = twitterFollowers;
        console.log('Twitter atualizado:', twitterFollowers);
    }
    
    const instagramFollowers = await fetchInstagramFollowers();
    if (instagramFollowers) {
        followers.instagram = instagramFollowers;
        console.log('Instagram atualizado:', instagramFollowers);
    }
    
    const threadsFollowers = await fetchThreadsFollowers();
    if (threadsFollowers) {
        followers.threads = threadsFollowers;
        console.log('Threads atualizado:', threadsFollowers);
    }
    
    const tiktokFollowers = await fetchTikTokFollowers();
    if (tiktokFollowers) {
        followers.tiktok = tiktokFollowers;
        console.log('TikTok atualizado:', tiktokFollowers);
    }
    
    const facebookFollowers = await fetchFacebookFollowers();
    if (facebookFollowers) {
        followers.facebook = facebookFollowers;
        console.log('Facebook atualizado:', facebookFollowers);
    }
    
    const discordMembers = await fetchDiscordMembers();
    if (discordMembers) {
        followers.discord = discordMembers;
        console.log('Discord atualizado:', discordMembers);
    }
    
    followers.lastUpdated = new Date().toISOString();
    
    fs.writeFileSync(followersFile, JSON.stringify(followers, null, 2), 'utf8');
    console.log('Arquivo followers.json atualizado com sucesso!');
}

updateAllFollowers().catch(error => {
    console.error('Erro durante atualização:', error);
    process.exit(1);
});