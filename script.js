(function() {
    'use strict';

    var followersData = {
        twitter: '4698',
        instagram: '1281',
        threads: '42',
        tiktok: '146',
        facebook: '20'
    };

    function formatNumber(num) {
        if (!num || num === '0') return '0';
        var n = parseInt(num, 10);
        if (n >= 1000000) {
            return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
        }
        if (n >= 1000) {
            return (n / 1000).toFixed(1).replace('.0', '') + 'K';
        }
        return n.toLocaleString('pt-BR');
    }

    function calculateTotalFollowers() {
        var total = 0;
        Object.keys(followersData).forEach(function(key) {
            total += parseInt(followersData[key], 10) || 0;
        });
        return total;
    }

    function updateTotalDisplay() {
        var totalEl = document.getElementById('totalFollowers');
        if (totalEl) {
            totalEl.textContent = formatNumber(calculateTotalFollowers());
        }
    }

    function createParticles() {
        var container = document.getElementById('particles');
        if (!container) return;
        var i, particle;
        for (i = 0; i < 25; i++) {
            particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 12 + 8) + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.width = (Math.random() * 2 + 1) + 'px';
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }
    }

    var socialLinks = [
        {
            name: 'Site',
            username: 'ecologica2verde.online',
            url: 'https://ecologica2verde.online/',
            icon: 'fa-globe',
            iconClass: 'website',
            hasFollowers: false
        },
        {
            name: 'Twitter / X',
            username: '@Ecologica3Verde',
            url: 'https://x.com/Ecologica3Verde',
            icon: 'fa-x-twitter',
            iconClass: 'twitter',
            hasFollowers: true,
            followersKey: 'twitter'
        },
        {
            name: 'Threads',
            username: '@ecologicaverde',
            url: 'https://www.threads.net/@ecologicaverde',
            icon: 'fa-threads',
            iconClass: 'threads',
            hasFollowers: true,
            followersKey: 'threads'
        },
        {
            name: 'TikTok',
            username: '@ecologica2verde',
            url: 'https://www.tiktok.com/@ecologica2verde',
            icon: 'fa-tiktok',
            iconClass: 'tiktok',
            hasFollowers: true,
            followersKey: 'tiktok'
        },
        {
            name: 'Instagram',
            username: '@ecologicaverde',
            url: 'https://www.instagram.com/ecologicaverde',
            icon: 'fa-instagram',
            iconClass: 'instagram',
            hasFollowers: true,
            followersKey: 'instagram'
        },
        {
            name: 'Facebook',
            username: 'ecologica2verde',
            url: 'https://www.facebook.com/ecologica2verde',
            icon: 'fa-facebook-f',
            iconClass: 'facebook',
            hasFollowers: true,
            followersKey: 'facebook'
        }
    ];

    function buildLinkElement(link) {
        var a = document.createElement('a');
        a.href = link.url;
        a.className = 'link-btn';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        var statsHTML = '';
        if (link.hasFollowers && followersData[link.followersKey]) {
            statsHTML = '<span class="link-stats"><i class="fas fa-users"></i> ' + 
                        formatNumber(followersData[link.followersKey]) + '</span>';
        }

        a.innerHTML = 
            '<div class="link-left">' +
                '<div class="link-icon ' + link.iconClass + '">' +
                    '<i class="fa-brands ' + link.icon + '"></i>' +
                '</div>' +
                '<div class="link-info">' +
                    '<span class="link-label">' + link.name + '</span>' +
                    '<span class="link-user">' + link.username + '</span>' +
                    statsHTML +
                '</div>' +
            '</div>' +
            '<i class="fas fa-chevron-right link-arrow"></i>';

        return a;
    }

    function renderLinks() {
        var container = document.getElementById('linksContainer');
        if (!container) return;
        container.innerHTML = '';

        socialLinks.forEach(function(link, index) {
            var el = buildLinkElement(link);
            el.style.animationDelay = (0.15 + index * 0.08) + 's';
            container.appendChild(el);
        });
    }

    function loadFollowersData() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'followers.json', true);
        xhr.timeout = 5000;
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    if (data.twitter) followersData.twitter = data.twitter;
                    if (data.instagram) followersData.instagram = data.instagram;
                    if (data.threads) followersData.threads = data.threads;
                    if (data.tiktok) followersData.tiktok = data.tiktok;
                    if (data.facebook) followersData.facebook = data.facebook;
                } catch (e) {}
            }
            renderLinks();
            updateTotalDisplay();
        };
        xhr.onerror = function() {
            renderLinks();
            updateTotalDisplay();
        };
        xhr.ontimeout = function() {
            renderLinks();
            updateTotalDisplay();
        };
        xhr.send();
    }

    document.addEventListener('DOMContentLoaded', function() {
        createParticles();
        updateTotalDisplay();
        loadFollowersData();
    });
})();