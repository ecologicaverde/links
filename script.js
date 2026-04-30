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
    var isPlaying = false;
    var playlist = ['OST1.m4a', 'OST2.m4a', 'OST3.m4a', 'OST4.m4a'];
    var autoPlayAttempted = false;

    var translations = {
        pt: {
            title: 'Ecológica Verde',
            subtitle: 'ᴅɪᴠᴜʟɢᴀɴᴅᴏ ᴄᴏɪsᴀs “ᴄᴏᴍᴘʀᴀᴅᴀs” ᴇᴄᴏʟᴏɢɪᴄᴀᴍᴇɴᴛᴇ.',
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
            discord: 'Servidor Discord',
            members: 'membros',
            followers: 'seguidores',
            musicSection: 'Música',
            shareSection: 'Compartilhar',
            languageName: 'Português'
        },
        en: {
            title: 'Ecológica Verde',
            subtitle: 'SHARING ECOLOGICALLY "PURCHASED" THINGS.',
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
            followers: 'followers',
            musicSection: 'Music',
            shareSection: 'Share',
            languageName: 'English'
        },
        es: {
            title: 'Ecológica Verde',
            subtitle: 'COMPARTIENDO COSAS "COMPRADAS" ECOLÓGICAMENTE.',
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
            followers: 'seguidores',
            musicSection: 'Música',
            shareSection: 'Compartir',
            languageName: 'Español'
        },
        ru: {
            title: 'Ecológica Verde',
            subtitle: 'ДЕЛИМСЯ ЭКОЛОГИЧЕСКИ "ПРИОБРЕТЕННЫМИ" ВЕЩАМИ.',
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
            followers: 'подписчиков',
            musicSection: 'Музыка',
            shareSection: 'Поделиться',
            languageName: 'Русский'
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

    function updateLanguage() {
        var t = translations[currentLanguage];
        document.getElementById('siteTitle').textContent = t.title;
        document.getElementById('siteSubtitle').textContent = t.subtitle;
        document.getElementById('nonprofitText').textContent = t.nonprofit;
        document.getElementById('copyLinkText').textContent = t.copyLink;
        document.getElementById('whatsappText').textContent = t.whatsapp;
        document.getElementById('qrCodeText').textContent = t.qrCode;
        document.getElementById('qrTitle').textContent = t.qrTitle;
        document.getElementById('qrInstruction').textContent = t.qrInstruction;
        document.getElementById('musicSectionTitle').textContent = t.musicSection;
        document.getElementById('shareSectionTitle').innerHTML = '<i class="fas fa-share-alt"></i><span>' + t.shareSection + '</span>';
        document.getElementById('currentLanguageLabel').textContent = t.languageName;
        
        renderLinks();
    }

    function createParticles() {
        var container = document.getElementById('particles');
        if (!container) {
            return;
        }
        container.innerHTML = '';
        for (var i = 0; i < 150; i++) {
            var dot = document.createElement('div');
            dot.className = 'particle-dot';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.bottom = '-20px';
            var duration = Math.random() * 15 + 10;
            dot.style.animationDuration = duration + 's';
            dot.style.animationDelay = Math.random() * 12 + 's';
            var size = Math.random() * 3 + 1;
            dot.style.width = size + 'px';
            dot.style.height = size + 'px';
            dot.style.opacity = Math.random() * 0.5 + 0.3;
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
        };

        xhr.onerror = function() {
            renderLinks();
        };

        xhr.ontimeout = function() {
            renderLinks();
        };

        xhr.send();
    }

    function getRandomSong() {
        return Math.floor(Math.random() * playlist.length);
    }

    function loadSong(index, autoplay = true) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        
        var songPath = 'assets/music/' + playlist[index];
        currentAudio = new Audio(songPath);
        currentAudio.loop = false;
        
        var volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            currentAudio.volume = volumeSlider.value / 100;
        }
        
        var nowPlayingSpan = document.getElementById('nowPlaying');
        if (nowPlayingSpan) {
            nowPlayingSpan.textContent = playlist[index];
        }
        
        currentAudio.addEventListener('ended', function() {
            var nextIndex = (currentSongIndex + 1) % playlist.length;
            currentSongIndex = nextIndex;
            loadSong(currentSongIndex, isPlaying);
        });
        
        if (autoplay && isPlaying) {
            var playPromise = currentAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(err) {
                    console.log('Autoplay bloqueado:', err);
                });
            }
        }
    }

    function updateButtonState() {
        var toggleBtn = document.getElementById('musicToggle');
        if (!toggleBtn) return;
        
        if (isPlaying) {
            toggleBtn.classList.add('on');
            toggleBtn.classList.remove('off');
            var statusSpan = toggleBtn.querySelector('.toggle-status');
            var iconI = toggleBtn.querySelector('.toggle-icon');
            if (statusSpan) statusSpan.textContent = 'ON';
            if (iconI) iconI.className = 'fas fa-volume-up toggle-icon';
        } else {
            toggleBtn.classList.add('off');
            toggleBtn.classList.remove('on');
            var statusSpanOff = toggleBtn.querySelector('.toggle-status');
            var iconIOff = toggleBtn.querySelector('.toggle-icon');
            if (statusSpanOff) statusSpanOff.textContent = 'OFF';
            if (iconIOff) iconIOff.className = 'fas fa-volume-mute toggle-icon';
        }
    }

    function attemptAutoPlay() {
        if (autoPlayAttempted) return;
        autoPlayAttempted = true;
        
        if (currentAudio && isPlaying) {
            var playPromise = currentAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    console.log('Autoplay bem sucedido');
                }).catch(function(err) {
                    console.log('Autoplay bloqueado pelo navegador:', err);
                    isPlaying = false;
                    updateButtonState();
                });
            }
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
        
        var volumeSlider = document.getElementById('volumeSlider');
        if (savedVolume !== null) {
            volumeSlider.value = savedVolume;
        }
        
        loadSong(currentSongIndex, false);
        
        setTimeout(function() {
            attemptAutoPlay();
        }, 100);
        
        var toggleBtn = document.getElementById('musicToggle');
        var prevBtn = document.getElementById('prevBtn');
        var nextBtn = document.getElementById('nextBtn');
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', function() {
                var volume = volumeSlider.value / 100;
                if (currentAudio) currentAudio.volume = volume;
                localStorage.setItem('musicVolume', volumeSlider.value);
            });
        }
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                if (isPlaying) {
                    if (currentAudio) currentAudio.pause();
                    isPlaying = false;
                } else {
                    if (currentAudio) {
                        var playPromise = currentAudio.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(function(err) {
                                console.log('Playback bloqueado:', err);
                            });
                        }
                    }
                    isPlaying = true;
                }
                localStorage.setItem('musicState', isPlaying);
                updateButtonState();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
                loadSong(currentSongIndex, isPlaying);
                localStorage.setItem('currentSong', currentSongIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentSongIndex = (currentSongIndex + 1) % playlist.length;
                loadSong(currentSongIndex, isPlaying);
                localStorage.setItem('currentSong', currentSongIndex);
            });
        }
        
        updateButtonState();
        
        document.body.addEventListener('click', function() {
            attemptAutoPlay();
        }, { once: true });
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
        
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                var url = window.location.href;
                navigator.clipboard.writeText(url).then(function() {
                    showToast(translations[currentLanguage].linkCopied);
                });
            });
        }
        
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function() {
                var url = window.location.href;
                var text = encodeURIComponent('Confira a página da Ecológica Verde: ' + url);
                window.open('https://wa.me/?text=' + text, '_blank');
            });
        }
        
        if (qrBtn) {
            qrBtn.addEventListener('click', function() {
                var container = document.getElementById('qrCodeContainer');
                if (container) {
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
                }
                if (modal) modal.style.display = 'flex';
            });
        }
        
        if (closeSpan) {
            closeSpan.addEventListener('click', function() {
                if (modal) modal.style.display = 'none';
            });
        }
        
        if (modal) {
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    function initLanguageSelector() {
        var savedLang = localStorage.getItem('language');
        if (savedLang && translations[savedLang]) {
            currentLanguage = savedLang;
        }
        
        var menuBtn = document.getElementById('languageMenuBtn');
        var dropdown = document.getElementById('languageDropdown');
        var langOptions = document.querySelectorAll('.lang-option');
        
        if (menuBtn && dropdown) {
            menuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });
            
            document.addEventListener('click', function() {
                dropdown.classList.remove('show');
            });
            
            dropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
        
        langOptions.forEach(function(option) {
            option.addEventListener('click', function() {
                currentLanguage = this.getAttribute('data-lang');
                localStorage.setItem('language', currentLanguage);
                updateLanguage();
                dropdown.classList.remove('show');
            });
        });
        
        updateLanguage();
    }

    document.addEventListener('DOMContentLoaded', function() {
        createParticles();
        loadFollowers();
        initMusicPlayer();
        initShareFeatures();
        initLanguageSelector();
    });
})();