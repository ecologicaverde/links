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
        const response = await axios.get('https://tweethunter.io/metrics-calculator/Ecologica3Verde', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 15000
        });
        const $ = cheerio.load(response.data);
        const text = $('body').text();
        const match = text.match(/@Ecologica3Verde · ([\d.]+[KM]?) followers/i);
        if (match && match[1]) {
            let value = match[1];
            if (value.includes('K')) {
                return (parseFloat(value) * 1000).toString();
            }
            if (value.includes('M')) {
                return (parseFloat(value) * 1000000).toString();
            }
            return value;
        }
    } catch (error) {
        console.error('Erro ao buscar Twitter:', error.message);
    }
    return null;
}

async function fetchTikTokFollowers() {
    try {
        const response = await axios.get('https://tokcounter.com/pt?user=ecologica2verde', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 15000
        });
        const html = response.data;
        const digitMatches = [...html.matchAll(/<span class="odometer-value">(\d)<\/span>/g)];
        if (digitMatches.length > 0) {
            const number = digitMatches.map(m => m[1]).join('');
            if (number && !isNaN(parseInt(number))) {
                return parseInt(number).toString();
            }
        }
    } catch (error) {
        console.error('Erro ao buscar TikTok:', error.message);
    }
    return null;
}

async function fetchInstagramFollowers() {
    try {
        const response = await axios.get('https://instrack.app/instagram/ecologicaverde', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 15000
        });
        const $ = cheerio.load(response.data);
        let found = false;
        let followersCount = null;
        $('h6').each(function() {
            if ($(this).text().trim().toLowerCase() === 'followers') {
                found = true;
                return false;
            }
        });
        if (found) {
            $('h4').each(function() {
                const text = $(this).text().trim();
                const match = text.match(/[\d,]+/);
                if (match && !followersCount) {
                    followersCount = match[0].replace(/,/g, '');
                    return false;
                }
            });
        }
        if (followersCount) {
            return followersCount;
        }
    } catch (error) {
        console.error('Erro ao buscar Instagram:', error.message);
    }
    return null;
}

async function fetchFacebookFollowers() {
    try {
        const response = await axios.get('https://livecounts.xyz/facebook-live-follower-count/ecologica2verde', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 15000
        });
        const html = response.data;
        const digitMatches = [...html.matchAll(/<span class="odometer-value">(\d)<\/span>/g)];
        if (digitMatches.length > 0) {
            const number = digitMatches.map(m => m[1]).join('');
            if (number && !isNaN(parseInt(number))) {
                return parseInt(number).toString();
            }
        }
        const fallbackMatch = html.match(/(\d+)\s*(?:Followers|Seguidores)/i);
        if (fallbackMatch && fallbackMatch[1]) {
            return fallbackMatch[1];
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
    return null;
}

async function updateAllFollowers() {
    console.log('========================================');
    console.log('Iniciando atualização de seguidores...');
    console.log('Data/Hora:', new Date().toLocaleString('pt-BR'));
    console.log('========================================');
    
    console.log('\n📡 Buscando dados...');
    
    const twitterFollowers = await fetchTwitterFollowers();
    if (twitterFollowers) {
        followers.twitter = twitterFollowers;
        console.log('✅ Twitter atualizado:', twitterFollowers);
    } else {
        console.log('⚠️ Twitter não atualizado, mantendo anterior:', followers.twitter);
    }
    
    const tiktokFollowers = await fetchTikTokFollowers();
    if (tiktokFollowers) {
        followers.tiktok = tiktokFollowers;
        console.log('✅ TikTok atualizado:', tiktokFollowers);
    } else {
        console.log('⚠️ TikTok não atualizado, mantendo anterior:', followers.tiktok);
    }
    
    const instagramFollowers = await fetchInstagramFollowers();
    if (instagramFollowers) {
        followers.instagram = instagramFollowers;
        console.log('✅ Instagram atualizado:', instagramFollowers);
    } else {
        console.log('⚠️ Instagram não atualizado, mantendo anterior:', followers.instagram);
    }
    
    const facebookFollowers = await fetchFacebookFollowers();
    if (facebookFollowers) {
        followers.facebook = facebookFollowers;
        console.log('✅ Facebook atualizado:', facebookFollowers);
    } else {
        console.log('⚠️ Facebook não atualizado, mantendo anterior:', followers.facebook);
    }
    
    const discordMembers = await fetchDiscordMembers();
    if (discordMembers) {
        followers.discord = discordMembers;
        console.log('✅ Discord atualizado:', discordMembers);
    } else {
        console.log('⚠️ Discord não atualizado, mantendo anterior:', followers.discord);
    }
    
    console.log('\n📊 THREADS: manterá valor manual por enquanto (', followers.threads, ')');
    console.log('   (Automação para Threads exige navegador e está desativada)');
    
    console.log('\n📊 VALORES FINAIS:');
    console.log('────────────────────────────────────────');
    console.log('🐦 Twitter:', followers.twitter);
    console.log('📸 Instagram:', followers.instagram);
    console.log('🪡 Threads (manual):', followers.threads);
    console.log('🎵 TikTok:', followers.tiktok);
    console.log('📘 Facebook:', followers.facebook);
    console.log('🎮 Discord:', followers.discord);
    console.log('────────────────────────────────────────');
    
    followers.lastUpdated = new Date().toISOString();
    
    fs.writeFileSync(followersFile, JSON.stringify(followers, null, 2), 'utf8');
    console.log('\n✅ Arquivo followers.json atualizado com sucesso!');
    console.log('🕒 Última atualização:', new Date(followers.lastUpdated).toLocaleString('pt-BR'));
    console.log('========================================');
}

updateAllFollowers().catch(error => {
    console.error('❌ Erro durante atualização:', error);
    process.exit(1);
});
