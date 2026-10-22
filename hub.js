    /* Which view loaded this script: "hub" (all servers except the ranked one) or "ranked" (only the ranked server). */
    const HUB_VIEW = window.BCHQ_VIEW || "hub";
    /* Any server whose name contains one of these words (case-insensitive) is the ranked server. Keep in step with RANKED_SERVER in the Function App. */
    const RANKED_NAME_MATCH = ["ranked"];
    const isRankedName = (n) => RANKED_NAME_MATCH.some(w => String(n || "").toLowerCase().includes(w));
    const AZURE_API_URL = "https://acc-results-api-uk-eshycfeacuewd2b8.francecentral-01.azurewebsites.net/api/HttpTrigger1";
    const ASSET_PATH = "https://cdn.jsdelivr.net/gh/BrandedCha0s/bchq-dashboard@main/tracks/";

    const ACC_TRACK_NAMES = {
        "monza": "Autodromo Nazionale Monza",
        "zolder": "Circuit Zolder",
        "brands_hatch": "Brands Hatch",
        "silverstone": "Silverstone Circuit",
        "paul_ricard": "Circuit Paul Ricard",
        "misano": "Misano World Circuit",
        "spa": "Circuit de Spa-Francorchamps",
        "nurburgring": "Nürburgring GP",
        "nurburgring_24h": "Nürburgring 24h (Nordschleife)",
        "barcelona": "Circuit de Barcelona-Catalunya",
        "hungaroring": "Hungaroring",
        "zandvoort": "Circuit Zandvoort",
        "kyalami": "Kyalami Grand Prix Circuit",
        "mount_panorama": "Mount Panorama (Bathurst)",
        "suzuka": "Suzuka Circuit",
        "laguna_seca": "WeatherTech Raceway Laguna Seca",
        "imola": "Autodromo Enzo e Dino Ferrari (Imola)",
        "donington": "Donington Park",
        "oulton_park": "Oulton Park",
        "snetterton": "Snetterton Circuit",
        "cota": "Circuit of the Americas (COTA)",
        "indianapolis": "Indianapolis Motor Speedway",
        "watkins_glen": "Watkins Glen International",
        "valencia": "Circuit Ricardo Tormo (Valencia)",
        "red_bull_ring": "Red Bull Ring"
    };

    const CAR_SETUP_FOLDERS = [
        { folder: "amr_v8_vantage_gt3", name: "Aston Martin V8 Vantage GT3" },
        { folder: "audi_r8_lms_evo_ii", name: "Audi R8 LMS GT3 evo II" },
        { folder: "bentley_continental_gt3_2018", name: "Bentley Continental GT3" },
        { folder: "bmw_m4_gt3", name: "BMW M4 GT3" },
        { folder: "ferrari_296_gt3", name: "Ferrari 296 GT3" },
        { folder: "ferrari_488_gt3_evo", name: "Ferrari 488 GT3 Evo" },
        { folder: "ford_mustang_gt3", name: "Ford Mustang GT3" },
        { folder: "honda_nsx_gt3_evo", name: "Honda NSX GT3 Evo" },
        { folder: "lamborghini_huracan_gt3_evo2", name: "Lamborghini Huracan Evo2" },
        { folder: "lexus_rc_f_gt3", name: "Lexus RC F GT3" },
        { folder: "mclaren_720s_gt3", name: "McLaren 720S GT3" },
        { folder: "mclaren_720s_gt3_evo", name: "McLaren 720S GT3 Evo 2023" },
        { folder: "mercedes_amg_gt3_evo", name: "Mercedes-AMG GT3 Evo" },
        { folder: "nissan_gt_r_gt3_2018", name: "Nissan GT-R Nismo GT3" }
    ];

    const GITHUB_TRACK_FOLDERS = {
        "monza": "monza",
        "spa": "Spa",
        "nurburgring": "nurburgring",
        "nurburgring_24h": "nurburgring_24h",
        "suzuka": "Suzuka",
        "silverstone": "Silverstone",
        "laguna_seca": "Laguna_Seca",
        "imola": "Imola",
        "brands_hatch": "brands_hatch",
        "zolder": "Zolder",
        "paul_ricard": "Paul_Ricard",
        "barcelona": "Barcelona",
        "hungaroring": "Hungaroring",
        "zandvoort": "Zandvoort",
        "kyalami": "Kyalami",
        "mount_panorama": "mount_panorama",
        "donington": "donington",
        "oulton_park": "oulton_park",
        "snetterton": "snetterton",
        "cota": "cota",
        "indianapolis": "indianapolis",
        "watkins_glen": "watkins_glen",
        "valencia": "Valencia",
        "red_bull_ring": "red_bull_ring"
    };

    const ACC_AMATEUR_TARGETS = {
        "monza": { beginner: "1:52–1:55", amateur: "1:49–1:50", strong: "1:47–1:48", pro: "1:45–1:46" },
        "spa": { beginner: "2:22–2:25", amateur: "2:19–2:20", strong: "2:17–2:18", pro: "2:15–2:16" },
        "silverstone": { beginner: "2:03–2:06", amateur: "1:59–2:00", strong: "1:57–1:58", pro: "1:55–1:56" },
        "barcelona": { beginner: "1:48–1:51", amateur: "1:45–1:46", strong: "1:43–1:44", pro: "1:42–1:43" },
        "nurburgring": { beginner: "1:58–2:01", amateur: "1:55–1:56", strong: "1:53–1:54", pro: "1:52–1:53" },
        "brands_hatch": { beginner: "1:28–1:30", amateur: "1:25–1:26", strong: "1:23–1:24", pro: "1:22–1:23" },
        "paul_ricard": { beginner: "1:58–2:01", amateur: "1:55–1:56", strong: "1:53–1:54", pro: "1:52–1:53" },
        "suzuka": { beginner: "2:04–2:07", amateur: "2:00–2:02", strong: "1:59–2:00", pro: "1:57–1:58" },
        "misano": { beginner: "1:39–1:41", amateur: "1:35–1:36", strong: "1:33–1:34", pro: "1:32–1:33" },
        "zolder": { beginner: "1:32–1:34", amateur: "1:29–1:30", strong: "1:27–1:28", pro: "1:26–1:27" },
        "nurburgring_24h": { beginner: "8:40–9:00", amateur: "8:20–8:30", strong: "8:05–8:15", pro: "7:55–8:02" },
        "imola": { beginner: "1:49–1:52", amateur: "1:46–1:47", strong: "1:44–1:45", pro: "1:42–1:43" },
        "hungaroring": { beginner: "1:46–1:49", amateur: "1:43–1:44", strong: "1:41–1:42", pro: "1:39–1:40" },
        "zandvoort": { beginner: "1:39–1:42", amateur: "1:36–1:37", strong: "1:34–1:35", pro: "1:32–1:33" },
        "kyalami": { beginner: "1:45–1:48", amateur: "1:42–1:43", strong: "1:40–1:41", pro: "1:38–1:39" },
        "mount_panorama": { beginner: "2:07–2:12", amateur: "2:03–2:05", strong: "2:00–2:02", pro: "1:58–1:59" },
        "laguna_seca": { beginner: "1:25–1:28", amateur: "1:22–1:23", strong: "1:20–1:21", pro: "1:18–1:19" },
        "donington": { beginner: "1:31–1:34", amateur: "1:28–1:29", strong: "1:26–1:27", pro: "1:24–1:25" },
        "oulton_park": { beginner: "1:39–1:42", amateur: "1:36–1:37", strong: "1:34–1:35", pro: "1:32–1:33" },
        "snetterton": { beginner: "1:52–1:55", amateur: "1:48–1:50", strong: "1:46–1:47", pro: "1:44–1:45" },
        "cota": { beginner: "2:10–2:14", amateur: "2:06–2:08", strong: "2:03–2:05", pro: "2:01–2:02" },
        "indianapolis": { beginner: "1:26–1:29", amateur: "1:23–1:24", strong: "1:21–1:22", pro: "1:19–1:20" },
        "watkins_glen": { beginner: "1:49–1:52", amateur: "1:46–1:47", strong: "1:44–1:45", pro: "1:42–1:43" },
        "valencia": { beginner: "1:35–1:38", amateur: "1:32–1:33", strong: "1:30–1:31", pro: "1:28–1:29" },
        "red_bull_ring": { beginner: "1:31–1:34", amateur: "1:28–1:29", strong: "1:26–1:27", pro: "1:24–1:25" }
    };

    function getGitHubTrackFolder(rawTrack) {
        if (!rawTrack) return "nurburgring";
        const clean = rawTrack.toLowerCase().replace(/_\d{4}$/, '').trim();
        return GITHUB_TRACK_FOLDERS[clean] || clean;
    }

    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function formatBCHQText(text) {
        if (!text) return "";
        return escapeHtml(text).replace(/BCHQ/g, '<span class="brand-bc">BC</span><span class="brand-hq">HQ</span>');
    }

    function getTrackFileName(rawTrackKey) {
        if (!rawTrackKey) return "nurburgring.png";
        const cleanKey = rawTrackKey.toLowerCase().replace(/_\d{4}$/, '').trim();
        const sortedKeys = Object.keys(ACC_TRACK_NAMES).sort((a, b) => b.length - a.length);
        const matchedKey = sortedKeys.find(k => cleanKey.includes(k));
        return matchedKey ? `${matchedKey}.png` : `${cleanKey}.png`;
    }

    function getTrackDisplayName(rawTrackKey) {
        if (!rawTrackKey) return "NÜRBURGRING GP";
        const cleanKey = rawTrackKey.toLowerCase().replace(/_\d{4}$/, '').trim();
        const sortedKeys = Object.keys(ACC_TRACK_NAMES).sort((a, b) => b.length - a.length);
        const matchedKey = sortedKeys.find(k => cleanKey.includes(k));
        return matchedKey ? ACC_TRACK_NAMES[matchedKey] : cleanKey.replace(/_/g, ' ').toUpperCase();
    }

    function formatLapTime(ms) {
        if (!ms || ms === 999999999 || ms <= 0) return "--:--.---";
        const min = Math.floor(ms / 60000);
        const sec = Math.floor((ms % 60000) / 1000);
        const millis = ms % 1000;
        return `${min}:${sec.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
    }

    // Razo usernames of the streamers (blank/remove one if they aren't on Razo). Keep in step with RAZO_USERS on streamers.html.
    const RAZO_USERS = ["brandedchaos86", "harry", "alteredpixelz"];

    async function checkStreamersLiveStatus() {
        const streamers = ["brandedchaos86", "H477Y96", "Alteredpixelz"];
        const btn = document.getElementById("header-streamers-btn");
        const badge = document.getElementById("streamer-live-badge");
        if (!btn || !badge) return;

        let anyLive = false;
        for (const user of streamers) {
            try {
                const res = await fetch(`${AZURE_API_URL}?type=twitch&user=${user}`);
                const data = await res.json();
                if (data && data.isLive) {
                    anyLive = true;
                    break;
                }
            } catch (e) {}
        }

        // Razo has no Twitch-style API, so the Function App reads Razo's public live list for all of them in one request.
        if (!anyLive) {
            try {
                const res = await fetch(`${AZURE_API_URL}?type=razo&users=${RAZO_USERS.join(",")}`);
                const data = await res.json();
                if (data && data.ok && data.streamers && Object.values(data.streamers).some(x => x && x.isLive)) anyLive = true;
            } catch (e) {}
        }

        if (anyLive) {
            btn.classList.add("streamer-is-live");
            badge.style.display = "block";
        } else {
            btn.classList.remove("streamer-is-live");
            badge.style.display = "none";
        }
    }

    async function handleCarSetupSelection(selectElement, trackFolder) {
        const selectedValue = selectElement.value;
        if (!selectedValue) return;

        if (!selectedValue.startsWith('http')) {
            const carFolder = selectedValue;
            const selectedOptionText = selectElement.options[selectElement.selectedIndex].text;
            selectElement.innerHTML = `<option value="" disabled selected>Loading setups...</option>`;

            try {
                const apiUrl = `https://api.github.com/repos/BrandedCha0s/acc-car-setups/contents/${carFolder}/${trackFolder}`;
                const res = await fetch(apiUrl);
                const files = await res.json();

                let optionsHtml = `<option value="" disabled selected>Select File (${selectedOptionText})...</option>`;

                if (Array.isArray(files)) {
                    const jsonFiles = files.filter(f => f.name.endsWith('.json'));
                    if (jsonFiles.length > 0) {
                        jsonFiles.forEach(f => {
                            optionsHtml += `<option value="${f.download_url}" data-filename="${f.name}">${f.name}</option>`;
                        });
                    } else {
                        optionsHtml += `<option value="" disabled>No setup files found for this track</option>`;
                    }
                } else {
                    optionsHtml += `<option value="" disabled>No setup folder exists for this track</option>`;
                }

                selectElement.innerHTML = optionsHtml;
            } catch (err) {
                console.error("Failed to fetch setups:", err);
                selectElement.innerHTML = `<option value="" disabled>Error loading setups</option>`;
            }
            return;
        }

        const fileUrl = selectedValue;
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const fileName = selectedOption.getAttribute("data-filename") || "setup.json";

        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            selectElement.selectedIndex = 0;
        } catch (e) {
            window.open(fileUrl, '_blank');
        }
    }

    /* Reserve the server grid's last known height up front so the sections below don't jump when the cards load. */
    (function reserveServerHeight() {
        const c = document.getElementById("servers-container");
        if (!c) return;
        let h = 0;
        try { h = parseInt(localStorage.getItem(HUB_VIEW === "ranked" ? "bchq_servers_h_r" : "bchq_servers_h") || "0", 10); } catch (e) {}
        c.style.minHeight = (h > 200 ? h : (HUB_VIEW === "ranked" ? 360 : 700)) + "px";
        c.style.alignContent = "start";   // never stretch the rows to fill the reserved height
        const key = HUB_VIEW === "ranked" ? "bchq_servers_h_r" : "bchq_servers_h";
        let t = null;
        const measure = () => {
            clearTimeout(t);
            t = setTimeout(() => {
                const cards = c.querySelectorAll(".server-card");
                if (!cards.length) return;
                const last = cards[cards.length - 1];
                const hh = Math.round(last.offsetTop + last.offsetHeight - cards[0].offsetTop);
                if (hh > 200) {
                    try { localStorage.setItem(key, String(hh)); } catch (e) {}
                    c.style.minHeight = hh + "px";   // follow the real height, so it also shrinks when there are fewer cards
                }
            }, 1200);
        };
        if ("ResizeObserver" in window) new ResizeObserver(measure).observe(c);
        new MutationObserver(measure).observe(c, { childList: true });
    })();

    async function loadLiveServers(isBackground = false) {
        const container = document.getElementById("servers-container");
        if (!container) return;

        if (!isBackground) {
            const cachedData = localStorage.getItem("bchq_cached_servers");
            if (cachedData) {
                try {
                    const parsed = JSON.parse(cachedData);
                    renderServerCards(parsed, container);
                } catch (e) {}
            }
        }

        try {
            const response = await fetch(`${AZURE_API_URL}?type=servers`);
            const data = await response.json();
            
            localStorage.setItem("bchq_cached_servers", JSON.stringify(data));
            
            const instances = Array.isArray(data) ? data : (data.instances || []);
            if (instances.length > 0) {
                renderServerCards(instances, container);
            }
        } catch (err) {}
    }

    function getNum(name) {
        if (!name) return 999;
        const match = name.match(/#(\d+)/);
        return match ? parseInt(match[1], 10) : 1;
    }

    // Total drivers online across ALL servers (ranked included, whichever page filter is active). Only on pages with the counter.
    function updateOnlineTotal(instances) {
        const el = document.getElementById("online-now");
        if (!el) return;
        const live = instances.filter(i => i && i.isOnline);
        const total = live.reduce((n, i) => n + (Number(i.connectedCount) || 0), 0);
        const busy = live.filter(i => (Number(i.connectedCount) || 0) > 0).length;
        el.classList.toggle("quiet", total === 0);
        el.innerHTML = `<span class="online-dot"></span><b>${total}</b> ${total === 1 ? "driver" : "drivers"} online` +
            (total > 0 ? ` <span class="online-sub">across ${busy} ${busy === 1 ? "server" : "servers"}</span>` : ` <span class="online-sub">join the Discord to get a race going</span>`);
        el.style.visibility = "visible";
    }

    function renderServerCards(instances, container) {
        updateOnlineTotal(instances);
        const anyRanked = instances.some(i => isRankedName(i.name));
        if (HUB_VIEW === "ranked") {
            instances = instances.filter(i => isRankedName(i.name));
            if (!instances.length) { container.innerHTML = `<div style="color: var(--text-muted); padding: 20px; font-weight:600;">The ranked server isn't online right now. Check back soon, or join the <a href="https://discord.gg/SmvcXeXdyS" style="color:var(--accent-cyan)">Discord</a> for race times.</div>`; return; }
        } else if (anyRanked) {
            instances = instances.filter(i => !isRankedName(i.name));
        }
        instances.sort((a, b) => {
            const getNum = name => {
                if (!name) return 999;
                const match = name.match(/#(\d+)/);
                return match ? parseInt(match[1], 10) : 1;
            };
            return getNum(a.name) - getNum(b.name);
        });

        let html = "";
        instances.forEach(inst => {
            const serverName = inst.name || "ACC Server";
            const formattedTitle = formatBCHQText(serverName);
            const rawTrack = inst.track || "nurburgring";
            const maxSlots = inst.maxSlots || 20;
            const isOnline = Boolean(inst.isOnline);

            const fileName = getTrackFileName(rawTrack);
            const displayName = getTrackDisplayName(rawTrack);
            const trackImgUrl = `${ASSET_PATH}${fileName}?v=1.1`;

            let mapTransformClass = "";
            const lowerTrack = rawTrack.toLowerCase();
            if (lowerTrack.includes("suzuka")) mapTransformClass = "rotate-suzuka";
            else if (lowerTrack.includes("silverstone")) mapTransformClass = "rotate-silverstone";
            else if (lowerTrack.includes("nurburgring_24h")) mapTransformClass = "rotate-nurburgring_24h";

            const trackFolder = getGitHubTrackFolder(rawTrack);
            let carOptionsHtml = CAR_SETUP_FOLDERS.map(car => {
                return `<option value="${car.folder}">${car.name}</option>`;
            }).join('');

            const cleanTrackKey = lowerTrack.replace(/_\d{4}$/, '').trim();
            const trackTargets = ACC_AMATEUR_TARGETS[cleanTrackKey];
            let targetsHtml = "";
            
            if (trackTargets) {
                targetsHtml = `
                    <div class="track-targets-box">
                        <div class="targets-header">
                            <i class="fa-solid fa-flag-checkered"></i> AMATEUR TARGET LAP TIMES
                        </div>
                        <div class="targets-grid">
                            <div class="target-item">
                                <span class="target-label">Beginner</span>
                                <span class="target-time">${trackTargets.beginner}</span>
                            </div>
                            <div class="target-item">
                                <span class="target-label">Amateur</span>
                                <span class="target-time">${trackTargets.amateur}</span>
                            </div>
                            <div class="target-item">
                                <span class="target-label">Strong Amateur</span>
                                <span class="target-time">${trackTargets.strong}</span>
                            </div>
                            <div class="target-item">
                                <span class="target-label">Very Fast</span>
                                <span class="target-time">${trackTargets.pro}</span>
                            </div>
                        </div>
                    </div>
                `;
            }

            const isLocked = inst.passwordProtected || inst.isLocked || false;
            const ambientTemp = inst.ambientTemp ?? "22";
            const trackTemp = inst.trackTemp ?? "28";
            const rainChance = inst.rainChance ?? "0%";

            // Session strip: every session of the weekend (FP / Q / R), the current one highlighted and counting down.
            const sess = inst.session;
            const SESS_LABELS = { 0: "FP", 4: "Q", 10: "R" };
            const sessList = (Array.isArray(inst.sessions) && inst.sessions.length)
                ? inst.sessions
                : [{ type: 0, minutes: null }, { type: 4, minutes: null }, { type: 10, minutes: null }];
            const fmtMins = (m) => m === null ? "" : (m >= 60 ? (m % 60 ? Math.floor(m / 60) + "h" + (m % 60) : (m / 60) + "h") : m + "m");
            const currentType = sess ? sess.type : null;
            let currentSeen = false;
            const chips = sessList.map(x => {
                const active = isOnline && sess && x.type === currentType && !currentSeen;
                if (active) currentSeen = true;
                return `<div class="sess-chip${active ? ' active' : ''}"><span class="sess-name">${SESS_LABELS[x.type] || '?'}</span><span class="sess-val">${active ? '' : fmtMins(x.minutes)}</span></div>`;
            }).join('');
            const sessionBadge = isOnline ? `
                <div class="session-strip" ${(sess && typeof sess.remainingMs === "number") ? `data-ms="${Math.round(sess.remainingMs)}" data-at="${Date.now()}" data-waiting="${(sess.waiting || sess.running === false) ? '1' : '0'}"` : ''}>
                    ${chips}
                    ${(sess && sess.waiting) ? '<div class="sess-note">Waiting for drivers</div>' : ''}
                </div>` : '';

            const badgesHtml = `
                ${sessionBadge}
                <div class="server-badges">
                    <div class="server-badge ${isLocked ? 'badge-locked' : 'badge-open'}">
                        <i class="fa-solid fa-${isLocked ? 'lock' : 'lock-open'}"></i> 
                        ${isLocked ? 'LOCKED' : 'OPEN'}
                    </div>
                    <div class="server-badge">
                        <i class="fa-solid fa-temperature-half"></i> 
                        Amb: ${ambientTemp}°C
                    </div>
                    <div class="server-badge">
                        <i class="fa-solid fa-road"></i> 
                        Track: ${trackTemp}°C
                    </div>
                    <div class="server-badge">
                        <i class="fa-solid fa-cloud-rain"></i> 
                        Rain: ${rainChance}
                    </div>
                </div>
            `;

            const realNames = (Array.isArray(inst.drivers) ? inst.drivers : [])
                .filter(n => n && !/^Connected Driver #/i.test(n));
            const chipsHtml = realNames.length ? `
                <div class="driver-chips">
                    ${realNames.slice(0, 8).map(n => `<span class="driver-chip">${escapeHtml(n)}</span>`).join('')}
                    ${realNames.length > 8 ? `<span class="driver-chip more">+${realNames.length - 8} more</span>` : ''}
                </div>` : '';

            html += `
                <div class="server-card ${isOnline ? '' : 'offline'}" data-server-id="${escapeHtml(String(inst.id))}" data-server-name="${escapeHtml(serverName)}" data-track="${escapeHtml(rawTrack)}" data-online="${isOnline ? '1' : '0'}">
                    <div class="server-header">
                        <div>
                            <div class="server-title">${formattedTitle}</div>
                            <div class="server-track"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(displayName).toUpperCase()}</div>
                        </div>
                        <button class="copy-btn" data-name="${escapeHtml(serverName)}" onclick="copyServerName(this)">
                            <i class="fa-regular fa-copy"></i> Copy Name
                        </button>
                    </div>
                    <div class="track-map-container">
                        <img class="track-map-img ${mapTransformClass}" src="${trackImgUrl}" alt="${escapeHtml(displayName)}" onerror="this.onerror=null; this.src='${ASSET_PATH}nurburgring.png?v=1.1';" />
                    </div>

                    ${badgesHtml}

                    <div style="margin: 10px 0; background: rgba(0, 240, 255, 0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-size: 0.8rem; font-family: 'Orbitron', sans-serif; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-sliders" style="color: var(--accent-cyan);"></i> SETUPS
                        </span>
                        <select onchange="handleCarSetupSelection(this, '${trackFolder}')" style="background: var(--bg-dark); color: var(--accent-cyan); border: 1px solid var(--accent-cyan); padding: 4px 8px; border-radius: 6px; font-family: 'Rajdhani', sans-serif; font-size: 0.9rem; font-weight: 600; cursor: pointer; outline: none; max-width: 190px;">
                            <option value="" disabled selected>Select Car Setup...</option>
                            ${carOptionsHtml}
                        </select>
                    </div>

                    ${targetsHtml}

                    <div style="margin: 10px 0 0 0; padding-top: 8px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                        <span class="meta-label">Connected Drivers</span>
                        <span class="meta-value" style="color: var(--accent-cyan); font-weight: 700;">
                            ${inst.connectedCount || 0} / ${maxSlots}
                        </span>
                    </div>
                    ${chipsHtml}
                    <div class="presence presence-card" data-presence="${escapeHtml(String(inst.id))}">${(presenceCache[inst.id] && presenceCache[inst.id].html) || ""}</div>

                    <div class="server-meta" style="margin-top: 10px;">
                        <div class="meta-item">
                            <span class="meta-label">Status</span>
                            <span class="meta-value" style="color: ${isOnline ? 'var(--accent-green)' : 'var(--accent-red)'}">
                                ${isOnline ? 'RUNNING' : 'OFFLINE'}
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Capacity</span>
                            <span class="meta-value">${maxSlots} Slots</span>
                        </div>
                    </div>
                    ${isOnline ? '<div class="live-hint"><i class="fa-solid fa-stopwatch"></i> Click for session timing</div>' : ''}
                </div>
            `;
        });
        container.innerHTML = html;
        tickSessionClocks();
        container.querySelectorAll("[data-presence]").forEach(el => ensurePresence(el.dataset.presence));
    }

    // Session countdown on the cards: the server sends the time left when it was fetched; count down from there
    // between the 15 s refreshes. Only the highlighted (current) session shows a clock.
    function tickSessionClocks() {
        document.querySelectorAll(".session-strip").forEach(el => {
            const val = el.querySelector(".sess-chip.active .sess-val");
            if (!val) return;
            if (el.dataset.ms === undefined) { val.textContent = ""; return; }
            const waiting = el.dataset.waiting === "1";   // clock isn't running until a driver joins
            const left = waiting ? Number(el.dataset.ms) : Math.max(0, Number(el.dataset.ms) - (Date.now() - Number(el.dataset.at)));
            const t = Math.floor(left / 1000);
            const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
            val.textContent = (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(s).padStart(2, "0");
        });
    }
    setInterval(tickSessionClocks, 1000);

    const GT3_CAR_MODELS = {
        0: "Porsche 991 GT3 R", 1: "Mercedes-AMG GT3", 2: "Ferrari 488 GT3", 3: "Audi R8 LMS", 4: "Lamborghini Huracan GT3",
        5: "McLaren 650S GT3", 6: "Nissan GT-R Nismo GT3 2018", 7: "BMW M6 GT3", 8: "Bentley Continental GT3 2018",
        10: "Nissan GT-R Nismo GT3 2017", 11: "Bentley Continental GT3 2016", 12: "Aston Martin V12 Vantage GT3",
        13: "Lamborghini Gallardo R-EX", 14: "Jaguar G3", 15: "Lexus RC F GT3", 16: "Lamborghini Huracan Evo (2019)",
        17: "Honda NSX GT3", 19: "Audi R8 LMS Evo (2019)", 20: "AMR V8 Vantage (2019)", 21: "Honda NSX Evo (2019)",
        22: "McLaren 720S GT3 (2019)", 23: "Porsche 911II GT3 R (2019)", 24: "Ferrari 488 GT3 Evo 2020", 25: "Mercedes-AMG GT3 2020",
        30: "BMW M4 GT3", 31: "Audi R8 LMS GT3 evo II", 32: "Ferrari 296 GT3", 33: "Lamborghini Huracan Evo2",
        34: "Porsche 992 GT3 R", 35: "McLaren 720S GT3 Evo 2023", 36: "Ford Mustang GT3"
    };

    function getCarName(modelId) {
        if (modelId === undefined || modelId === null) return "GT3";
        let name = GT3_CAR_MODELS[modelId] || modelId;
        return String(name).replace(/^Car ID:\s*/i, '').trim();
    }

    function switchSessionTable(sessionType) {
        const qualWrapper = document.getElementById('qualifying-table-wrapper');
        const raceWrapper = document.getElementById('race-table-wrapper');
        const btnQual = document.getElementById('btn-qualifying');
        const btnRace = document.getElementById('btn-race');

        if (sessionType === 'qualifying') {
            qualWrapper.style.display = 'block';
            raceWrapper.style.display = 'none';
            btnQual.classList.add('active');
            btnRace.classList.remove('active');
        } else {
            qualWrapper.style.display = 'none';
            raceWrapper.style.display = 'block';
            btnQual.classList.remove('active');
            btnRace.classList.add('active');
        }
    }

    async function fetchLeaderboard(trackName) {
        const qualTbody = document.getElementById("qualifying-leaderboard-body");
        const raceTbody = document.getElementById("race-leaderboard-body");
        if (!qualTbody || !raceTbody) return;

        try {
            const carSel = document.getElementById("car-select");
            const carFilter = carSel && carSel.value ? `&car=${encodeURIComponent(carSel.value)}` : "";
            const periodSel = document.getElementById("period-select");
            const periodFilter = periodSel && periodSel.value ? `&period=${encodeURIComponent(periodSel.value)}` : "";
            const response = await fetch(`${AZURE_API_URL}?track=${encodeURIComponent(trackName)}${carFilter}${periodFilter}`);
            let drivers = await response.json();

            let qualDrivers = [];
            let raceDrivers = [];

            if (Array.isArray(drivers)) {
                qualDrivers = drivers.filter(d => d.sessionType && d.sessionType.toLowerCase().includes('qualifying')).slice(0, 10);
                raceDrivers = drivers.filter(d => !d.sessionType || d.sessionType.toLowerCase().includes('race')).slice(0, 10);
            }

            if (qualDrivers.length === 0) {
                qualTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color: var(--text-muted);">No recorded qualifying lap times for ${trackName} yet.</td></tr>`;
            } else {
                let html = "";
                const leaderLapMs = qualDrivers[0].bestLapMs;
                qualDrivers.forEach((driver, index) => {
                    const rank = index + 1;
                    const rankClass = rank === 1 ? 'rank-1' : (rank === 2 ? 'rank-2' : (rank === 3 ? 'rank-3' : ''));
                    const gap = index === 0 ? "—" : `+${((driver.bestLapMs - leaderLapMs) / 1000).toFixed(3)}s`;

                    html += `
                        <tr>
                            <td class="rank-column ${rankClass}">#${rank}</td>
                            <td class="driver-name">${driver.driverName ? `<a class="driver-name-link" href="driver.html?name=${encodeURIComponent(driver.driverName)}">${escapeHtml(driver.driverName)}</a>` : 'Unknown'}</td>
                            <td><span class="car-badge">${escapeHtml(getCarName(driver.carModel))}</span></td>
                            <td class="session">${driver.sessionType || 'Qualifying'}</td>
                            <td class="lap-time">${formatLapTime(driver.bestLapMs)}</td>
                            <td class="gap-cell">${gap}</td>
                            <td>${driver.lastUpdated ? new Date(driver.lastUpdated).toLocaleDateString() : '—'}</td>
                        </tr>
                    `;
                });
                qualTbody.innerHTML = html;
            }

            if (raceDrivers.length === 0) {
                raceTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color: var(--text-muted);">No recorded race lap times for ${trackName} yet.</td></tr>`;
            } else {
                let html = "";
                const leaderLapMs = raceDrivers[0].bestLapMs;
                raceDrivers.forEach((driver, index) => {
                    const rank = index + 1;
                    const rankClass = rank === 1 ? 'rank-1' : (rank === 2 ? 'rank-2' : (rank === 3 ? 'rank-3' : ''));
                    const gap = index === 0 ? "—" : `+${((driver.bestLapMs - leaderLapMs) / 1000).toFixed(3)}s`;

                    html += `
                        <tr>
                            <td class="rank-column ${rankClass}">#${rank}</td>
                            <td class="driver-name">${driver.driverName ? `<a class="driver-name-link" href="driver.html?name=${encodeURIComponent(driver.driverName)}">${escapeHtml(driver.driverName)}</a>` : 'Unknown'}</td>
                            <td><span class="car-badge">${escapeHtml(getCarName(driver.carModel))}</span></td>
                            <td class="session">${driver.sessionType || 'Race'}</td>
                            <td class="lap-time">${formatLapTime(driver.bestLapMs)}</td>
                            <td class="gap-cell">${gap}</td>
                            <td>${driver.lastUpdated ? new Date(driver.lastUpdated).toLocaleDateString() : '—'}</td>
                        </tr>
                    `;
                });
                raceTbody.innerHTML = html;
            }

        } catch (err) {
            qualTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color: var(--accent-red);">Failed to query Azure DB records.</td></tr>`;
            raceTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color: var(--accent-red);">Failed to query Azure DB records.</td></tr>`;
        }
    }

    function buildCarFilter() {
        const sel = document.getElementById("car-select");
        if (!sel || sel.options.length > 1) return;
        const names = [...new Set(Object.values(GT3_CAR_MODELS))].sort((a, b) => a.localeCompare(b));
        sel.innerHTML = '<option value="">All cars</option>' + names.map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
    }

    function onCarChange() {
        const trackSel = document.getElementById("track-select");
        fetchLeaderboard(trackSel ? trackSel.value : "nurburgring");
    }

    function onTrackChange(trackName) {
        localStorage.setItem("bchq_selected_track", trackName);
        fetchLeaderboard(trackName);
    }

    function copyServerName(btn) {
        const name = btn.getAttribute("data-name");
        if (!name) return;
        navigator.clipboard.writeText(name).then(() => {
            const toast = document.getElementById("toast");
            if (toast) {
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), 2500);
            }
        });
    }

    // ================= Live timing modal + driver profiles =================
    const LIVE_POLL_MS = 2500;
    const SESSION_TYPES = { 0: "Practice", 4: "Qualifying", 9: "Superpole", 10: "Race", 11: "Hotlap", 12: "Hotstint", 13: "Hotlap Superpole" };
    const live = { serverId: null, view: "live", timer: null, seq: 0, lastData: null };

    function ensureLiveModal() {
        let el = document.getElementById("live-modal");
        if (el) return el;

        el = document.createElement("div");
        el.id = "live-modal";
        el.className = "live-modal";
        el.innerHTML = `
            <div class="live-modal-backdrop" data-close="1"></div>
            <div class="live-modal-panel" role="dialog" aria-modal="true" aria-labelledby="live-modal-title">
                <div class="live-modal-head">
                    <div>
                        <div class="live-modal-title" id="live-modal-title"></div>
                        <div class="live-modal-sub" id="live-modal-sub"></div>
                    </div>
                    <button class="live-modal-close" data-close="1" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="live-modal-body" id="live-modal-body"></div>
            </div>`;

        el.addEventListener("click", (e) => {
            if (e.target.closest("[data-close]")) return closeLiveModal();
            const drv = e.target.closest("[data-driver]");
            if (drv) return showDriverProfile(drv.getAttribute("data-driver"));
            if (e.target.closest("[data-back]")) {
                live.view = "live";
                renderLive(live.lastData);
                pollLive();
            }
        });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLiveModal(); });
        document.body.appendChild(el);
        return el;
    }

    function openLiveModal(serverId, serverName, track) {
        const el = ensureLiveModal();
        live.serverId = serverId;
        live.view = "live";
        live.lastData = null;

        // Server names look like "BCHQ #2 | <Join Discord> ... | www.bchqhub.com"; show just the first part.
        document.getElementById("live-modal-title").innerHTML = formatBCHQText(String(serverName).split("|")[0].trim());
        document.getElementById("live-modal-sub").textContent = getTrackDisplayName(track).toUpperCase();
        document.getElementById("live-modal-body").innerHTML = `<div class="live-empty">Loading session timing…</div>`;

        el.classList.add("open");
        document.body.classList.add("live-modal-open");

        clearInterval(live.timer);
        pollLive();
        live.timer = setInterval(pollLive, LIVE_POLL_MS);
    }

    // ---- Busy times on the server cards: last 7 days of driver counts as an hour-of-day chart in the viewer's own time ----
    const presenceCache = {};     // serverId -> { html, at, loading }
    const PRESENCE_REFRESH_MS = 10 * 60 * 1000;

    async function ensurePresence(serverId) {
        const c = presenceCache[serverId] || (presenceCache[serverId] = { html: "", at: 0, loading: false });
        if (c.loading || (c.at && Date.now() - c.at < PRESENCE_REFRESH_MS)) return;
        c.loading = true;
        try {
            const res = await fetch(`${AZURE_API_URL}?type=presence&server=${encodeURIComponent(serverId)}`, { signal: AbortSignal.timeout(6000) });
            const data = await res.json();
            c.html = presenceHtml(data && data.days);
            c.at = Date.now();
            document.querySelectorAll(`[data-presence="${CSS.escape(String(serverId))}"]`).forEach(el => { el.innerHTML = c.html; });
        } catch (e) { /* the chart is optional */ }
        c.loading = false;
    }

    function presenceHtml(days) {
        if (!Array.isArray(days) || !days.length) {
            return `<div class="presence-title">BUSY TIMES</div><div class="presence-sub">Collecting data, check back in a few days</div>`;
        }
        // peak[day|hour] = most drivers seen in that local hour that day
        const peak = {};
        days.forEach(d => {
            const [y, m, dd] = d.date.split("-").map(Number);
            Object.entries(d.buckets || {}).forEach(([slot, n]) => {
                const t = new Date(Date.UTC(y, m - 1, dd, 0, Number(slot) * 15));
                const key = d.date + "|" + t.getHours();
                peak[key] = Math.max(peak[key] ?? 0, Number(n) || 0);
            });
        });
        const sum = Array(24).fill(0), cnt = Array(24).fill(0);
        Object.entries(peak).forEach(([key, n]) => { const h = Number(key.split("|")[1]); sum[h] += n; cnt[h] += 1; });
        const avg = sum.map((s, h) => cnt[h] ? s / cnt[h] : 0);
        const max = Math.max(...avg);
        const nowH = new Date().getHours();
        const bars = avg.map((v, h) => {
            const pct = max > 0 ? Math.max(6, Math.round(v / max * 100)) : 6;
            return `<div class="presence-bar${h === nowH ? " now" : ""}" style="height:${pct}%" title="${String(h).padStart(2, "0")}:00, about ${v.toFixed(1)} drivers"></div>`;
        }).join("");
        const busiest = max > 0 ? avg.indexOf(max) : -1;
        const summary = busiest >= 0
            ? `Busiest around ${String(busiest).padStart(2, "0")}:00 (your time)`
            : "Quiet this week";
        return `<div class="presence-title">BUSY TIMES · LAST 7 DAYS</div><div class="presence-sub">${summary}</div>
            <div class="presence-bars">${bars}</div>
            <div class="presence-axis"><span>00</span><span>06</span><span>12</span><span>18</span><span>23</span></div>`;
    }

    function closeLiveModal() {
        const el = document.getElementById("live-modal");
        if (!el || !el.classList.contains("open")) return;
        el.classList.remove("open");
        document.body.classList.remove("live-modal-open");
        clearInterval(live.timer);
        live.timer = null;
        live.serverId = null;
        live.seq++; // invalidate any in-flight request
    }

    async function pollLive() {
        if (!live.serverId || live.view !== "live" || document.hidden) return;
        const mySeq = ++live.seq;
        const id = live.serverId;
        try {
            const res = await fetch(`${AZURE_API_URL}?type=live&server=${encodeURIComponent(id)}`, {
                cache: "no-store",
                signal: AbortSignal.timeout(4000)
            });
            const data = await res.json();
            if (mySeq !== live.seq || id !== live.serverId || live.view !== "live") return;
            live.lastData = data;
            renderLive(data);
        } catch (e) {
            if (mySeq === live.seq && live.view === "live") renderLive({ live: false, error: true });
        }
    }

    function fmtDelta(ms) {
        if (ms === null || ms === undefined) return `<span class="dim">--</span>`;
        const cls = ms > 0 ? "delta-pos" : ms < 0 ? "delta-neg" : "";
        return `<span class="${cls}">${ms > 0 ? "+" : ""}${(ms / 1000).toFixed(3)}</span>`;
    }

    function fmtClock(ms) {
        if (ms === null || ms === undefined || ms < 0) return "";
        const t = Math.floor(ms / 1000);
        const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
        return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(s).padStart(2, "0");
    }

    function renderLive(data) {
        const body = document.getElementById("live-modal-body");
        if (!body || live.view !== "live") return;

        if (!data) {
            body.innerHTML = `<div class="live-empty">Loading session timing…</div>`;
            return;
        }
        if (!data.live || !Array.isArray(data.cars) || data.cars.length === 0) {
            body.innerHTML = `<div class="live-empty">${data.error
                ? "Couldn't reach the timing service. Retrying…"
                : "No timing data yet. Laps appear here after the server logs them."}</div>`;
            return;
        }

        const cars = [...data.cars].sort((a, b) => (a.position || 999) - (b.position || 999));
        const sessionBest = Math.min(...cars.map(c => c.bestLapMs > 0 ? c.bestLapMs : Infinity));
        const sess = data.session || {};
        const sessName = SESSION_TYPES[sess.type] || "Session";
        const remaining = fmtClock(sess.remainingMs);

        const hasCurrent = cars.some(c => c.currentLapMs !== null && c.currentLapMs !== undefined);
        const hasDelta = cars.some(c => c.deltaMs !== null && c.deltaMs !== undefined);
        const fmtGap = (c) => (c.bestLapMs > 0 && sessionBest !== Infinity)
            ? (c.bestLapMs === sessionBest ? `<span class="dim">--</span>` : `<span class="delta-pos">+${((c.bestLapMs - sessionBest) / 1000).toFixed(3)}</span>`)
            : `<span class="dim">--</span>`;

        const rows = cars.map(c => {
            const isBest = c.bestLapMs > 0 && c.bestLapMs === sessionBest;
            return `
                <tr>
                    <td class="num">${c.position || "-"}</td>
                    <td><button class="driver-link" data-driver="${escapeHtml(c.driverName)}">${escapeHtml(c.driverName) || "Unknown"}</button>${c.inPits ? '<span class="pit-tag">PIT</span>' : ""}</td>
                    <td class="col-car">${escapeHtml(getCarName(c.carModel))}</td>
                    <td class="num">${c.laps ?? "-"}</td>
                    ${hasCurrent ? `<td class="num">${formatLapTime(c.currentLapMs)}</td>` : ""}
                    <td class="num">${formatLapTime(c.lastLapMs)}</td>
                    <td class="num ${isBest ? "best-overall" : ""}">${formatLapTime(c.bestLapMs)}</td>
                    <td class="num">${hasDelta ? fmtDelta(c.deltaMs) : fmtGap(c)}</td>
                </tr>`;
        }).join("");

        body.innerHTML = `
            <div class="live-status">
                <span class="live-badge">SESSION</span>
                <span>${escapeHtml(sessName)}${remaining ? " · " + remaining + " remaining" : ""}</span>
                <span>${cars.length} driver${cars.length === 1 ? "" : "s"} on server</span>
                ${hasCurrent ? "" : '<span>Read from the server log, so lap times can run a lap or two behind</span>'}
            </div>
            <div class="live-table-wrap">
                <table class="live-table">
                    <thead><tr>
                        <th class="num">POS</th><th>DRIVER</th><th class="col-car">CAR</th><th class="num">LAPS</th>
                        ${hasCurrent ? '<th class="num">CURRENT</th>' : ""}<th class="num">LAST</th><th class="num">BEST</th><th class="num">${hasDelta ? "DELTA" : "GAP"}</th>
                    </tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>`;
    }

    async function showDriverProfile(name) {
        if (!name) return;
        live.view = "profile";
        live.seq++; // drop any in-flight live poll
        const body = document.getElementById("live-modal-body");
        body.innerHTML = `<div class="live-empty">Loading profile…</div>`;

        try {
            const res = await fetch(`${AZURE_API_URL}?driver=${encodeURIComponent(name)}`, { cache: "no-store" });
            const data = await res.json();
            if (live.view !== "profile") return; // user went back / closed while loading

            // The API does a "contains" search, so keep exact name matches only.
            const records = (Array.isArray(data) ? data : [])
                .filter(r => String(r.driverName || "").toLowerCase() === name.toLowerCase())
                .sort((a, b) => getTrackDisplayName(a.track).localeCompare(getTrackDisplayName(b.track)));

            const trackCount = new Set(records.map(r => getTrackDisplayName(r.track))).size;
            const rows = records.map(r => `
                <tr>
                    <td>${escapeHtml(getTrackDisplayName(r.track))}</td>
                    <td>${escapeHtml(getCarName(r.carModel))}</td>
                    <td>${escapeHtml(r.sessionType || "Race")}</td>
                    <td class="num">${formatLapTime(r.bestLapMs || r.bestLap)}</td>
                    <td class="num dim">${r.dateRecorded ? new Date(r.dateRecorded).toLocaleDateString() : "-"}</td>
                </tr>`).join("");

            body.innerHTML = `
                <button class="live-back" data-back="1"><i class="fa-solid fa-arrow-left"></i> Session timing</button>
                <div class="profile-name">${escapeHtml(name)}</div>
                ${records.length ? `
                    <div class="profile-stats">
                        <div><strong>${trackCount}</strong>Tracks</div>
                        <div><strong>${records.length}</strong>Personal bests</div>
                    </div>
                    <div class="live-table-wrap">
                        <table class="live-table">
                            <thead><tr><th>TRACK</th><th>CAR</th><th>SESSION</th><th class="num">BEST LAP</th><th class="num">SET</th></tr></thead>
                            <tbody>${rows}</tbody>
                        </table>
                    </div>` : `<div class="live-empty">No recorded laps for this driver yet.</div>`}`;
        } catch (e) {
            if (live.view === "profile") {
                body.innerHTML = `<button class="live-back" data-back="1"><i class="fa-solid fa-arrow-left"></i> Session timing</button>
                    <div class="live-empty">Couldn't load this profile. Try again in a moment.</div>`;
            }
        }
    }

    // One delegated listener: cards are re-rendered every 15s, so don't bind per card.
    function initLiveModalClicks() {
        const container = document.getElementById("servers-container");
        if (!container) return;
        container.addEventListener("click", (e) => {
            if (e.target.closest("select, button, option, a")) return; // setups dropdown, copy button
            const card = e.target.closest(".server-card");
            if (!card || card.dataset.online !== "1") return;
            openLiveModal(card.dataset.serverId, card.dataset.serverName, card.dataset.track);
        });
    }

    function initDashboard() {
        initLiveModalClicks();
        loadLiveServers();
        checkStreamersLiveStatus();

        const savedTrack = localStorage.getItem("bchq_selected_track") || "nurburgring";
        const trackSelect = document.querySelector("#track-select");
        if (trackSelect) trackSelect.value = savedTrack;

        buildCarFilter();
        fetchLeaderboard(savedTrack);

        setInterval(() => {
            loadLiveServers(true);
            checkStreamersLiveStatus();
        }, 15000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initDashboard);
    } else {
        initDashboard();
    }

    // Community totals strip (from saved race results). Stays hidden if there are none or the service is unreachable.
    (async function loadSiteTotals() {
        const el = document.getElementById("site-totals");
        if (!el) return;
        const n = (v) => Number(v || 0).toLocaleString();
        const paint = (t) => {
            el.innerHTML = `<span><i class="fa-solid fa-flag-checkered"></i> <b>${n(t.races)}</b> races</span>` +
                `<span><i class="fa-solid fa-rotate"></i> <b>${n(t.laps)}</b> race laps</span>` +
                `<span><i class="fa-solid fa-stopwatch"></i> <b>${n(t.hours)}</b> hours raced</span>` +
                `<span><i class="fa-solid fa-users"></i> <b>${n(t.drivers)}</b> race drivers</span>` +
                `<span class="site-totals-more">CHAMPIONSHIP & STATS <i class="fa-solid fa-arrow-right"></i></span>`;
            el.style.visibility = "visible";
        };
        const hide = () => { el.style.display = "none"; };
        /* The strip's space is reserved in CSS and the last totals are cached, so it never pushes the page down when it loads. */
        let hadCache = false;
        try { const c = JSON.parse(localStorage.getItem("bchq_cached_totals") || "null"); if (c && c.races) { paint(c); hadCache = true; } } catch (e) {}
        try {
            const res = await fetch(`${AZURE_API_URL}?type=community`, { signal: AbortSignal.timeout(8000) });
            const d = await res.json();
            const t = d && d.totals;
            if (!t || !t.races) { hide(); try { localStorage.removeItem("bchq_cached_totals"); } catch (e) {} return; }
            try { localStorage.setItem("bchq_cached_totals", JSON.stringify(t)); } catch (e) {}
            paint(t);
        } catch (e) { if (!hadCache) hide(); }
    })();
