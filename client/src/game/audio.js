let ctx = null;
let masterGain = null;

function ensureCtx() {
    if (!ctx || ctx.state === 'closed') {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = ctx.createGain();
        masterGain.gain.value = 1.0;
        masterGain.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') {
        ctx.resume();
    }
    return ctx;
}

const SFX_VOLUME = 0.5;

const BGM_TRACKS = ['/bgm1.mp3', '/bgm2.mp3', '/bgm3.mp3'];
let bgmIndex = 0;
let bgmAudio = new Audio();
bgmAudio.volume = 0.3;
bgmAudio.loop = false;
let bgmPlaying = false;

bgmAudio.addEventListener('ended', () => {
    console.log('BGM track ended');
    bgmIndex = (bgmIndex + 1) % BGM_TRACKS.length;
    if (bgmPlaying) {
        bgmAudio.src = BGM_TRACKS[bgmIndex];
        bgmAudio.play().catch(e => console.warn('BGM next track rejected:', e));
    }
});

bgmAudio.addEventListener('error', (e) => {
    console.error('BGM track error:', e);
    bgmIndex = (bgmIndex + 1) % BGM_TRACKS.length;
    if (bgmPlaying) {
        bgmAudio.src = BGM_TRACKS[bgmIndex];
        bgmAudio.play().catch(e => console.warn('BGM retry rejected:', e));
    }
});

export function playPowerUpSound() {
    try {
        const c = ensureCtx();
        const t = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.connect(g);
        g.connect(masterGain);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.2);
        g.gain.setValueAtTime(SFX_VOLUME * 0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.start(t);
        osc.stop(t + 0.25);
    } catch (e) {}
}

export function playShieldActivateSound() {
    try {
        const c = ensureCtx();
        const t = c.currentTime;
        const osc = c.createOscillator();
        const osc2 = c.createOscillator();
        const g = c.createGain();
        osc.connect(g);
        osc2.connect(g);
        g.connect(masterGain);
        osc.type = 'sine';
        osc2.type = 'sine';
        osc.frequency.value = 800;
        osc2.frequency.value = 1200;
        g.gain.setValueAtTime(SFX_VOLUME * 0.2, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc2.start(t);
        osc.stop(t + 0.3);
        osc2.stop(t + 0.3);
    } catch (e) {}
}

export function playEnemyDeathSound() {
    try {
        const c = ensureCtx();
        const t = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        const bufLen = c.sampleRate * 0.2;
        const buf = c.createBuffer(1, bufLen, c.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
        }
        const noise = c.createBufferSource();
        noise.buffer = buf;
        const ng = c.createGain();
        noise.connect(ng);
        ng.connect(masterGain);
        ng.gain.setValueAtTime(SFX_VOLUME * 0.25, t);
        ng.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        noise.start(t);
        noise.stop(t + 0.2);
        osc.connect(g);
        g.connect(masterGain);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.exponentialRampToValueAtTime(50, t + 0.15);
        g.gain.setValueAtTime(SFX_VOLUME * 0.3, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.start(t);
        osc.stop(t + 0.15);
    } catch (e) {}
}

export function playBossDeathSound() {
    try {
        const c = ensureCtx();
        const t = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.connect(g);
        g.connect(masterGain);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, t);
        osc.frequency.exponentialRampToValueAtTime(30, t + 0.5);
        g.gain.setValueAtTime(SFX_VOLUME * 0.4, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        osc.start(t);
        osc.stop(t + 0.5);
        const bufLen = c.sampleRate * 0.5;
        const buf = c.createBuffer(1, bufLen, c.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
        }
        const noise = c.createBufferSource();
        noise.buffer = buf;
        const ng = c.createGain();
        noise.connect(ng);
        ng.connect(masterGain);
        ng.gain.setValueAtTime(SFX_VOLUME * 0.3, t);
        ng.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        noise.start(t);
        noise.stop(t + 0.5);
    } catch (e) {}
}

export function setBgmVolume(vol) {
    if (bgmAudio) {
        bgmAudio.volume = vol;
    }
}

export function startBgm() {
    if (bgmPlaying) {
        bgmAudio.play().catch(e => console.warn('BGM resume rejected:', e));
        return;
    }
    bgmPlaying = true;
    const fileName = BGM_TRACKS[bgmIndex % BGM_TRACKS.length];
    bgmAudio.src = fileName;
    bgmAudio.play().catch(e => console.warn('BGM play rejected:', e));
}

export function stopBgm() {
    bgmPlaying = false;
    bgmAudio.pause();
    bgmAudio.src = '';
}
