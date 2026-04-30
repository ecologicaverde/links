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
    lastUpdated: new Date().toISOString()
};

async function fetchTwitterFollowers() {
    try {
        const response = await axios.get('https://x.com/Ecologica3Verde', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            },
            timeout: 10000
        });
        const $ = cheerio.load(response.data);
        const text = $('body').text();
        const match = text.match(/([\d,.]+)\s+Followers/);
        if (match && match[1]) {
            return match[1].replace(/,/g, '');
        }
        const metaMatch = text.match(/([\d,.]+)\s*Followers/);
        if (metaMatch && metaMatch[1]) {
            return metaMatch[1].replace(/,/g, '');
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            },
            timeout: 10000
        });
        const html = response.data;
        const jsonMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
        if (jsonMatch && jsonMatch[1]) {
            const data = JSON.parse(jsonMatch[1]);
            if (data.mainEntityofPage && data.mainEntityofPage.interactionStatistic) {
                const followStat = data.mainEntityofPage.interactionStatistic.find(
                    stat => stat.name === 'Follows'
                );
                if (followStat) {
                    return followStat.userInteractionCount.toString();
                }
            }
        }
        const scriptMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*({.*?});<\/script>/);
        if (scriptMatch && scriptMatch[1]) {
            const data = JSON.parse(scriptMatch[1]);
            if (data.user && data.user.edge_followed_by) {
                return data.user.edge_followed_by.count.toString();
            }
        }
        const ogMatch = html.match(/"edge_followed_by":\{"count":(\d+)\}/);
        if (ogMatch && ogMatch[1]) {
            return ogMatch[1];
        }
        const titleMatch = html.match(/title="([\d.]+)"/);
        if (titleMatch && titleMatch[1]) {
            return titleMatch[1].replace(/\./g, '');
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            },
            timeout: 10000
        });
        const html = response.data;
        const match = html.match(/"userInteractionCount"\s*:\s*(\d+)/);
        if (match && match[1]) {
            return match[1];
        }
        const titleMatch = html.match(/title="(\d+)"/);
        if (titleMatch && titleMatch[1]) {
            return titleMatch[1];
        }
        const textMatch = html.match(/(\d+)\s*seguidores/);
        if (textMatch && textMatch[1]) {
            return textMatch[1];
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            },
            timeout: 10000
        });
        const html = response.data;
        const match = html.match(/"followerCount":(\d+)/);
        if (match && match[1]) {
            return match[1];
        }
        const titleMatch = html.match(/<strong title="Seguidores" data-e2e="followers-count">(\d+)<\/strong>/);
        if (titleMatch && titleMatch[1]) {
            return titleMatch[1];
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            },
            timeout: 10000
        });
        const html = response.data;
        const match = html.match(/(\d+)\s*seguidores/);
        if (match && match[1]) {
            return match[1];
        }
        const strongMatch = html.match(/<strong[^>]*>(\d+)<\/strong>\s*seguidores/);
        if (strongMatch && strongMatch[1]) {
            return strongMatch[1];
        }
    } catch (error) {
        console.error('Erro ao buscar Facebook:', error.message);
    }
    return null;
}

async function updateAllFollowers() {
    console.log('Iniciando atualização de seguidores...');
    
    const twitterFollowers = await fetchTwitterFollowers();
    if (twitterFollowers) {
        followers.twitter = twitterFollowers;
        console.log(`Twitter atualizado: ${twitterFollowers} seguidores`);
    } else {
        console.log('Twitter: mantendo valor anterior');
    }
    
    const instagramFollowers = await fetchInstagramFollowers();
    if (instagramFollowers) {
        followers.instagram = instagramFollowers;
        console.log(`Instagram atualizado: ${instagramFollowers} seguidores`);
    } else {
        console.log('Instagram: mantendo valor anterior');
    }
    
    const threadsFollowers = await fetchThreadsFollowers();
    if (threadsFollowers) {
        followers.threads = threadsFollowers;
        console.log(`Threads atualizado: ${threadsFollowers} seguidores`);
    } else {
        console.log('Threads: mantendo valor anterior');
    }
    
    const tiktokFollowers = await fetchTikTokFollowers();
    if (tiktokFollowers) {
        followers.tiktok = tiktokFollowers;
        console.log(`TikTok atualizado: ${tiktokFollowers} seguidores`);
    } else {
        console.log('TikTok: mantendo valor anterior');
    }
    
    const facebookFollowers = await fetchFacebookFollowers();
    if (facebookFollowers) {
        followers.facebook = facebookFollowers;
        console.log(`Facebook atualizado: ${facebookFollowers} seguidores`);
    } else {
        console.log('Facebook: mantendo valor anterior');
    }
    
    followers.lastUpdated = new Date().toISOString();
    
    fs.writeFileSync(followersFile, JSON.stringify(followers, null, 2), 'utf8');
    console.log('Arquivo followers.json atualizado com sucesso!');
    console.log('Dados:', followers);
}

updateAllFollowers().catch(error => {
    console.error('Erro durante atualização:', error);
    process.exit(1);
});