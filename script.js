(function() {
    var followersData = {
        twitter: '4698',
        instagram: '1281',
        threads: '42',
        tiktok: '146',
        facebook: '20',
        discord: '58329'
    };

    var currentLanguage = 'pt';
    var currentAudio = null;
    var currentSongIndex = 0;
    var isPlaying = true;
    var playlist = ['OS1.m4a', 'OS2.m4a', 'OS3.m4a', 'OS4.m4a'];

    var translations = {
        pt: {
            title: 'Ecológica Verde',
            subtitle: 'ᴅɪᴠᴜʟɢᴀɴᴅᴏ ᴄᴏɪsᴀs “ᴄᴏᴍᴘʀᴀᴅᴀs” ᴇᴄᴏʟᴏɢɪᴄᴀᴍᴇɴᴛᴇ.',
            totalFollowers: 'Total de Seguidores',
            nonprofit: 'Projeto sem fins lucrativos',
            copyLink: 'Copiar Link',
            whatsapp: 'WhatsApp',
            qrCode: 'QR Code',
            qrTitle: 'QR Code',
            qrInstruction: 'Escaneie o QR Code para acessar esta página',
            linkCopied: 'Link copiado!',
            site: 'Site',
            twitter: 'Twitter / X',
            threads: 'Threads',
            tiktok: 'TikTok',
            instagram: 'Instagram',
            facebook: 'Facebook',
            discord: 'Discord Server',
            members: 'membros',
            followers: 'seguidores'
        },
        en: {
            title: 'Ecológica Verde',
            subtitle: 'SHARING ECOLOGICALLY "PURCHASED" THINGS.',
            totalFollowers: 'Total Followers',
            nonprofit: 'Non-profit project',
            copyLink: 'Copy Link',
            whatsapp: 'WhatsApp',
            qrCode: 'QR Code',
            qrTitle: 'QR Code',
            qrInstruction: 'Scan QR Code to access this page',
            linkCopied: 'Link copied!',
            site: 'Site',
            twitter: 'Twitter / X',
            threads: 'Threads',
            tiktok: 'TikTok',
            instagram: 'Instagram',
            facebook: 'Facebook',
            discord: 'Discord Server',
            members: 'members',
            followers: 'followers'
        },
        es: {
            title: 'Ecológica Verde',
            subtitle: 'COMPARTIENDO COSAS "COMPRADAS" ECOLÓGICAMENTE.',
            totalFollowers: 'Total de Seguidores',
            nonprofit: 'Proyecto sin fines de lucro',
            copyLink: 'Copiar Enlace',
            whatsapp: 'WhatsApp',
            qrCode: 'Código QR',
            qrTitle: 'Código QR',
            qrInstruction: 'Escanea el código QR para acceder a esta página',
            linkCopied: '¡Enlace copiado!',
            site: 'Sitio',
            twitter: 'Twitter / X',
            threads: 'Threads',
            tiktok: 'TikTok',
            instagram: 'Instagram',
            facebook: 'Facebook',
            discord: 'Servidor Discord',
            members: 'miembros',
            followers: 'seguidores'
        },
        ru: {
            title: 'Ecológica Verde',
            subtitle: 'ДЕЛИМСЯ ЭКОЛОГИЧЕСКИ "ПРИОБРЕТЕННЫМИ" ВЕЩАМИ.',
            totalFollowers: 'Всего подписчиков',
            nonprofit: 'Некоммерческий проект',
            copyLink: 'Копировать ссылку',
            whatsapp: 'WhatsApp',
            qrCode: 'QR-код',
            qrTitle: 'QR-код',
            qrInstruction: 'Отсканируйте QR-код для доступа к этой странице',
            linkCopied: 'Ссылка скопирована!',
            site: 'Сайт',
            twitter: 'Twitter / X',
            threads: 'Threads',
            tiktok: 'TikTok',
            instagram: 'Instagram',
            facebook: 'Facebook',
            discord: 'Discord сервер',
            members: 'участников',
            followers: 'подписчиков'
        }
    };

    var linksConfig = [
        {
            nameKey: 'site',
            username: 'ecologica2verde.online',
            url: 'https://ecologica2verde.online/',
            icon: 'fa-globe',
            styleClass: 'website',
            hasFollowers: false,
            useFavicon: true
        },
        {
            nameKey: 'twitter',
            username: '@Ecologica3Verde',
            url: 'https://x.com/Ecologica3Verde',
            icon: 'fa-x-twitter',
            styleClass: 'twitter',
            hasFollowers: true,
            key: 'twitter'
        },
        {
            nameKey: 'threads',
            username: '@ecologicaverde',
            url: 'https://www.threads.com/@ecologicaverde',
            icon: 'fa-threads',
            styleClass: 'threads',
            hasFollowers: true,
            key: 'threads'
        },
        {
            nameKey: 'tiktok',
            username: '@ecologica2verde',
            url: 'https://www.tiktok.com/@ecologica2verde',
            icon: 'fa-tiktok',
            styleClass: 'tiktok',
            hasFollowers: true,
            key: 'tiktok'
        },
        {
            nameKey: 'instagram',
            username: '@ecologicaverde',
            url: 'https://www.instagram.com/ecologicaverde',
            icon: 'fa-instagram',
            styleClass: 'instagram',
            hasFollowers: true,
            key: 'instagram'
        },
        {
            nameKey: 'facebook',
            username: 'ecologica2verde',
            url: 'https://www.facebook.com/ecologica2verde',
            icon: 'fa-facebook-f',
            styleClass: 'facebook',
            hasFollowers: true,
            key: 'facebook'
        },
        {
            nameKey: 'discord',
            username: 'Ecológica Verde',
            url: 'https://discord.gg/ZPbzpcPwFf',
            icon: 'fa-discord',
            styleClass: 'discord',
            hasFollowers: true,
            key: 'discord',
            followersLabelKey: 'members'
        }
    ];

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

    function updateLanguage() {
        var t = translations[currentLanguage];
        document.getElementById('siteTitle').textContent = t.title;
        document.getElementById('siteSubtitle').textContent = t.subtitle;
        document.getElementById('totalFollowersText').textContent = t.totalFollowers;
        document.getElementById('nonprofitText').textContent = t.nonprofit;
        document.getElementById('copyLinkText').textContent = t.copyLink;
        document.getElementById('whatsappText').textContent = t.whatsapp;
        document.getElementById('qrCodeText').textContent = t.qrCode;
        document.getElementById('qrTitle').textContent = t.qrTitle;
        document.getElementById('qrInstruction').textContent = t.qrInstruction;
        
        renderLinks();
    }

    function createParticles() {
        var container = document.getElementById('particles');
        if (!container) {
            return;
        }
        for (var i = 0; i < 50; i++) {
            var dot = document.createElement('div');
            dot.className = 'particle-dot';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.animationDuration = (Math.random() * 12 + 6) + 's';
            dot.style.animationDelay = Math.random() * 10 + 's';
            var size = Math.random() * 2.5 + 0.8;
            dot.style.width = size + 'px';
            dot.style.height = size + 'px';
            dot.style.opacity = Math.random() * 0.5 + 0.2;
            container.appendChild(dot);
        }
    }

    function buildLink(link) {
        var a = document.createElement('a');
        a.href = link.url;
        a.className = 'link-item';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        var t = translations[currentLanguage];
        var labelText = link.followersLabelKey === 'members' ? t.members : t.followers;
        
        var statsHtml = '';
        if (link.hasFollowers && followersData[link.key]) {
            statsHtml = '<span class="link-followers"><i class="fas fa-users"></i> ' +
                        formatNumber(followersData[link.key]) + ' ' + labelText + '</span>';
        }

        var iconHtml = '';
        if (link.useFavicon) {
            iconHtml = '<img src="assets/logo/favicon.png" alt="Site">';
        } else {
            iconHtml = '<i class="fa-brands ' + link.icon + '"></i>';
        }

        var linkName = t[link.nameKey] || link.nameKey;

        a.innerHTML =
            '<div class="link-left">' +
                '<div class="icon-box ' + link.styleClass + '">' +
                    iconHtml +
                '</div>' +
                '<div class="link-info">' +
                    '<span class="link-label">' + linkName + '</span>' +
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

    function getRandomSong() {
        return Math.floor(Math.random() * playlist.length);
    }

    function loadSong(index) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        
        var songPath = 'assets/music/' + playlist[index];
        currentAudio = new Audio(songPath);
        currentAudio.loop = false;
        currentAudio.volume = document.getElementById('volumeSlider').value / 100;
        
        currentAudio.addEventListener('ended', function() {
            var nextIndex = (currentSongIndex + 1) % playlist.length;
            currentSongIndex = nextIndex;
            loadSong(currentSongIndex);
            if (isPlaying) {
                currentAudio.play().catch(function(err) {
                    console.log('Playback bloqueado:', err);
                });
            }
        });
        
        if (isPlaying) {
            currentAudio.play().catch(function(err) {
                console.log('Playback bloqueado:', err);
            });
        }
    }

    function initMusicPlayer() {
        var savedState = localStorage.getItem('musicState');
        var savedVolume = localStorage.getItem('musicVolume');
        var savedSongIndex = localStorage.getItem('currentSong');
        
        if (savedState !== null) {
            isPlaying = savedState === 'true';
        } else {
            isPlaying = true;
        }
        
        if (savedSongIndex !== null && parseInt(savedSongIndex) < playlist.length) {
            currentSongIndex = parseInt(savedSongIndex);
        } else {
            currentSongIndex = getRandomSong();
        }
        
        loadSong(currentSongIndex);
        
        var toggleBtn = document.getElementById('musicToggle');
        var volumeSlider = document.getElementById('volumeSlider');
        var prevBtn = document.getElementById('prevBtn');
        var nextBtn = document.getElementById('nextBtn');
        
        if (savedVolume !== null) {
            volumeSlider.value = savedVolume;
            if (currentAudio) currentAudio.volume = savedVolume / 100;
        }
        
        function updateButtonState() {
            if (isPlaying) {
                toggleBtn.classList.add('on');
                toggleBtn.classList.remove('off');
                toggleBtn.querySelector('.toggle-status').textContent = 'ON';
                toggleBtn.querySelector('.toggle-icon').className = 'fas fa-volume-up toggle-icon';
            } else {
                toggleBtn.classList.add('off');
                toggleBtn.classList.remove('on');
                toggleBtn.querySelector('.toggle-status').textContent = 'OFF';
                toggleBtn.querySelector('.toggle-icon').className = 'fas fa-volume-mute toggle-icon';
            }
        }
        
        toggleBtn.addEventListener('click', function() {
            if (isPlaying) {
                if (currentAudio) currentAudio.pause();
                isPlaying = false;
            } else {
                if (currentAudio) currentAudio.play().catch(function(err) {
                    console.log('Playback bloqueado:', err);
                });
                isPlaying = true;
            }
            localStorage.setItem('musicState', isPlaying);
            updateButtonState();
        });
        
        volumeSlider.addEventListener('input', function() {
            var volume = volumeSlider.value / 100;
            if (currentAudio) currentAudio.volume = volume;
            localStorage.setItem('musicVolume', volumeSlider.value);
        });
        
        prevBtn.addEventListener('click', function() {
            currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
            loadSong(currentSongIndex);
            localStorage.setItem('currentSong', currentSongIndex);
            if (isPlaying && currentAudio) {
                currentAudio.play().catch(function(err) {
                    console.log('Playback bloqueado:', err);
                });
            }
        });
        
        nextBtn.addEventListener('click', function() {
            currentSongIndex = (currentSongIndex + 1) % playlist.length;
            loadSong(currentSongIndex);
            localStorage.setItem('currentSong', currentSongIndex);
            if (isPlaying && currentAudio) {
                currentAudio.play().catch(function(err) {
                    console.log('Playback bloqueado:', err);
                });
            }
        });
        
        updateButtonState();
    }

    function initShareFeatures() {
        var copyBtn = document.getElementById('copyLinkBtn');
        var whatsappBtn = document.getElementById('whatsappBtn');
        var qrBtn = document.getElementById('qrCodeBtn');
        var modal = document.getElementById('qrModal');
        var closeSpan = document.querySelector('.qr-close');
        var toast = document.getElementById('toastMessage');
        
        function showToast(message) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(function() {
                toast.classList.remove('show');
            }, 3000);
        }
        
        copyBtn.addEventListener('click', function() {
            var url = window.location.href;
            navigator.clipboard.writeText(url).then(function() {
                showToast(translations[currentLanguage].linkCopied);
            });
        });
        
        whatsappBtn.addEventListener('click', function() {
            var url = window.location.href;
            var text = encodeURIComponent('Confira a página da Ecológica Verde: ' + url);
            window.open('https://wa.me/?text=' + text, '_blank');
        });
        
        qrBtn.addEventListener('click', function() {
            var container = document.getElementById('qrCodeContainer');
            container.innerHTML = '';
            var url = window.location.href;
            new QRCode(container, {
                text: url,
                width: 200,
                height: 200,
                colorDark: '#4caf50',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
            modal.style.display = 'flex';
        });
        
        closeSpan.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    function initLanguageSelector() {
        var savedLang = localStorage.getItem('language');
        if (savedLang && translations[savedLang]) {
            currentLanguage = savedLang;
        }
        
        var langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                currentLanguage = this.getAttribute('data-lang');
                localStorage.setItem('language', currentLanguage);
                updateLanguage();
            });
        });
        
        updateLanguage();
    }

    document.addEventListener('DOMContentLoaded', function() {
        createParticles();
        updateTotalDisplay();
        loadFollowers();
        initMusicPlayer();
        initShareFeatures();
        initLanguageSelector();
    });
})();