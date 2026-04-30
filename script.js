(function() {
    var followersData = {
        twitter: '4698',
        instagram: '1281',
        threads: '42',
        tiktok: '146',
        facebook: '20',
        discord: '58329'
    };

    function formatNumber(num) {
        if (!num || num === '0') {
            return '0';
        }
        var n = parseInt(num, 10);
        if (n >= 1000000) {
            return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
        }
        if (n >= 1000) {
            return (n / 1000).toFixed(1).replace('.0', '') + 'K';
        }
        return n.toLocaleString('pt-BR');
    }

    function sumFollowers() {
        var total = 0;
        var keys = Object.keys(followersData);
        for (var i = 0; i < keys.length; i++) {
            total += parseInt(followersData[keys[i]], 10) || 0;
        }
        return total;
    }

    function updateTotalDisplay() {
        var el = document.getElementById('totalFollowers');
        if (el) {
            el.textContent = formatNumber(sumFollowers());
        }
    }

    function createParticles() {
        var container = document.getElementById('particles');
        if (!container) {
            return;
        }
        for (var i = 0; i < 25; i++) {
            var dot = document.createElement('div');
            dot.className = 'particle-dot';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.animationDuration = (Math.random() * 10 + 8) + 's';
            dot.style.animationDelay = Math.random() * 8 + 's';
            var size = Math.random() * 1.5 + 0.8;
            dot.style.width = size + 'px';
            dot.style.height = size + 'px';
            container.appendChild(dot);
        }
    }

    var linksConfig = [
        {
            name: 'Site',
            username: 'ecologica2verde.online',
            url: 'https://ecologica2verde.online/',
            icon: 'fa-globe',
            styleClass: 'website',
            hasFollowers: false
        },
        {
            name: 'Twitter / X',
            username: '@Ecologica3Verde',
            url: 'https://x.com/Ecologica3Verde',
            icon: 'fa-x-twitter',
            styleClass: 'twitter',
            hasFollowers: true,
            key: 'twitter'
        },
        {
            name: 'Threads',
            username: '@ecologicaverde',
            url: 'https://www.threads.com/@ecologicaverde',
            icon: 'fa-threads',
            styleClass: 'threads',
            hasFollowers: true,
            key: 'threads'
        },
        {
            name: 'TikTok',
            username: '@ecologica2verde',
            url: 'https://www.tiktok.com/@ecologica2verde',
            icon: 'fa-tiktok',
            styleClass: 'tiktok',
            hasFollowers: true,
            key: 'tiktok'
        },
        {
            name: 'Instagram',
            username: '@ecologicaverde',
            url: 'https://www.instagram.com/ecologicaverde',
            icon: 'fa-instagram',
            styleClass: 'instagram',
            hasFollowers: true,
            key: 'instagram'
        },
        {
            name: 'Facebook',
            username: 'ecologica2verde',
            url: 'https://www.facebook.com/ecologica2verde',
            icon: 'fa-facebook-f',
            styleClass: 'facebook',
            hasFollowers: true,
            key: 'facebook'
        },
        {
            name: 'Discord Server',
            username: 'Ecológica Verde',
            url: 'https://discord.gg/ZPbzpcPwFf',
            icon: 'fa-discord',
            styleClass: 'discord',
            hasFollowers: true,
            key: 'discord',
            followersLabel: 'membros'
        }
    ];

    function buildLink(link) {
        var a = document.createElement('a');
        a.href = link.url;
        a.className = 'link-item';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        var statsHtml = '';
        if (link.hasFollowers && followersData[link.key]) {
            var label = link.followersLabel || 'seguidores';
            statsHtml = '<span class="link-followers"><i class="fas fa-users"></i> ' +
                        formatNumber(followersData[link.key]) + ' ' + label + '</span>';
        }

        var iconHtml = '';
        if (link.useLogoIcon) {
            iconHtml = '<img src="assets/logo/logo.png" alt="Ecológica Verde">';
        } else {
            iconHtml = '<i class="fa-brands ' + link.icon + '"></i>';
        }

        a.innerHTML =
            '<div class="link-left">' +
                '<div class="icon-box ' + link.styleClass + '">' +
                    iconHtml +
                '</div>' +
                '<div class="link-info">' +
                    '<span class="link-label">' + link.name + '</span>' +
                    '<span class="link-user">' + link.username + '</span>' +
                    statsHtml +
                '</div>' +
            '</div>' +
            '<i class="fas fa-chevron-right link-arrow"></i>';

        return a;
    }

    function renderLinks() {
        var container = document.getElementById('linksContainer');
        if (!container) {
            return;
        }
        container.innerHTML = '';

        for (var i = 0; i < linksConfig.length; i++) {
            var el = buildLink(linksConfig[i]);
            el.style.animationDelay = (0.1 + i * 0.06) + 's';
            container.appendChild(el);
        }
    }

    function loadFollowers() {
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
                    if (data.discord) followersData.discord = data.discord;
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
        loadFollowers();
    });
})();