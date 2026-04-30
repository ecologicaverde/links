let followersData = {
    twitter: '4698',
    instagram: '1281',
    threads: '42',
    tiktok: '146',
    facebook: '20'
};

function formatNumber(num) {
    if (!num || num === '0') return '0';
    const n = parseInt(num);
    if (n >= 1000000) {
        return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
    } else if (n >= 1000) {
        return (n / 1000).toFixed(1).replace('.0', '') + 'K';
    }
    return n.toLocaleString('pt-BR');
}

function calculateTotalFollowers() {
    let total = 0;
    Object.values(followersData).forEach(value => {
        total += parseInt(value) || 0;
    });
    return total;
}

function updateTotalFollowers() {
    const totalElement = document.getElementById('totalFollowers');
    if (totalElement) {
        const total = calculateTotalFollowers();
        totalElement.textContent = formatNumber(total);
    }
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

fetch('followers.json')
    .then(response => response.json())
    .then(data => {
        followersData = {
            twitter: data.twitter || '4698',
            instagram: data.instagram || '1281',
            threads: data.threads || '42',
            tiktok: data.tiktok || '146',
            facebook: data.facebook || '20'
        };
        renderLinks();
        updateTotalFollowers();
    })
    .catch(() => {
        renderLinks();
        updateTotalFollowers();
    });

const socialLinks = [
    {
        name: 'Site',
        username: 'Ecológica Verde',
        url: 'https://ecologica2verde.online/',
        icon: 'fa-globe',
        iconClass: 'website',
        followers: null
    },
    {
        name: 'Twitter / X',
        username: '@Ecologica3Verde',
        url: 'https://x.com/Ecologica3Verde',
        icon: 'fa-x-twitter',
        iconClass: 'twitter',
        followersKey: 'twitter'
    },
    {
        name: 'Threads',
        username: '@ecologicaverde',
        url: 'https://www.threads.net/@ecologicaverde',
        icon: 'fa-threads',
        iconClass: 'threads',
        followersKey: 'threads'
    },
    {
        name: 'TikTok',
        username: '@ecologica2verde',
        url: 'https://www.tiktok.com/@ecologica2verde',
        icon: 'fa-tiktok',
        iconClass: 'tiktok',
        followersKey: 'tiktok'
    },
    {
        name: 'Instagram',
        username: '@ecologicaverde',
        url: 'https://www.instagram.com/ecologicaverde',
        icon: 'fa-instagram',
        iconClass: 'instagram',
        followersKey: 'instagram'
    },
    {
        name: 'Facebook',
        username: 'ecologica2verde',
        url: 'https://www.facebook.com/ecologica2verde',
        icon: 'fa-facebook-f',
        iconClass: 'facebook',
        followersKey: 'facebook'
    }
];

function createLinkElement(link, followers) {
    const a = document.createElement('a');
    a.href = link.url;
    a.className = 'link-button';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    
    let followersHTML = '';
    if (link.followersKey && followers[link.followersKey]) {
        const formattedCount = formatNumber(followers[link.followersKey]);
        followersHTML = `<span class="link-followers"><i class="fas fa-users"></i> ${formattedCount}</span>`;
    }
    
    a.innerHTML = `
        <div class="link-content">
            <div class="link-icon ${link.iconClass}">
                <i class="fa-brands ${link.icon}"></i>
            </div>
            <div class="link-text">
                <span class="link-name">${link.name}</span>
                <span class="link-username">${link.username}</span>
                ${followersHTML}
            </div>
        </div>
        <i class="fas fa-arrow-right arrow-icon"></i>
    `;
    
    return a;
}

function renderLinks() {
    const container = document.getElementById('linksContainer');
    if (!container) return;
    container.innerHTML = '';
    
    socialLinks.forEach((link, index) => {
        const linkElement = createLinkElement(link, followersData);
        linkElement.style.animationDelay = `${0.2 + index * 0.1}s`;
        container.appendChild(linkElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    if (document.getElementById('linksContainer')) {
        renderLinks();
        updateTotalFollowers();
    }
});