// Fallback renderers for sprites (no image loading needed)

export function drawPlayerShip(ctx, x, y, w, h) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    // Engine glow
    const flicker = Math.random() * 10;
    const gradient = ctx.createRadialGradient(0, h / 2 + 6, 0, 0, h / 2 + 6, 22 + flicker);
    gradient.addColorStop(0, 'rgba(0, 200, 255, 0.9)');
    gradient.addColorStop(0.5, 'rgba(0, 100, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 50, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, h / 2 + 6, 16 + flicker, 26 + flicker, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ship body
    ctx.fillStyle = '#0af';
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.lineTo(-w / 2, h / 4);
    ctx.lineTo(-w / 2 + 6, h / 2);
    ctx.lineTo(w / 2 - 6, h / 2);
    ctx.lineTo(w / 2, h / 4);
    ctx.closePath();
    ctx.fill();

    // Cockpit
    ctx.fillStyle = '#0ff';
    ctx.beginPath();
    ctx.moveTo(0, -h / 2 + 6);
    ctx.lineTo(-9, -2);
    ctx.lineTo(9, -2);
    ctx.closePath();
    ctx.fill();

    // Wings
    ctx.fillStyle = '#06c';
    ctx.fillRect(-w / 2 - 3, h / 8, 9, 20);
    ctx.fillRect(w / 2 - 5, h / 8, 9, 20);

    // Wing tips (red lights)
    ctx.fillStyle = '#f33';
    ctx.fillRect(-w / 2 - 2, h / 8 + 18, 5, 4);
    ctx.fillRect(w / 2 - 4, h / 8 + 18, 5, 4);

    // Body detail
    ctx.strokeStyle = '#0ff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -h / 2 + 8);
    ctx.lineTo(0, h / 2 - 6);
    ctx.stroke();

    ctx.restore();
}

export function drawEnemyType1(ctx, x, y, w, h) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    // Engine glow
    const flicker = Math.random() * 7;
    const gradient = ctx.createRadialGradient(0, -h / 2, 0, 0, -h / 2, 16 + flicker);
    gradient.addColorStop(0, 'rgba(255, 100, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, -h / 2, 12 + flicker, 20 + flicker, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = '#c33';
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(-w / 2, -h / 4);
    ctx.lineTo(-w / 2 + 6, -h / 2);
    ctx.lineTo(w / 2 - 6, -h / 2);
    ctx.lineTo(w / 2, -h / 4);
    ctx.closePath();
    ctx.fill();

    // Cockpit
    ctx.fillStyle = '#ff0';
    ctx.beginPath();
    ctx.moveTo(0, h / 2 - 8);
    ctx.lineTo(-7, -2);
    ctx.lineTo(7, -2);
    ctx.closePath();
    ctx.fill();

    // Wings
    ctx.fillStyle = '#922';
    ctx.fillRect(-w / 2 - 3, -h / 8, 9, 16);
    ctx.fillRect(w / 2 - 5, -h / 8, 9, 16);

    ctx.restore();
}

export function drawEnemyType2(ctx, x, y, w, h) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    const flicker = Math.random() * 8;

    // Engine glow
    const gradient = ctx.createRadialGradient(0, -h / 2, 0, 0, -h / 2, 18 + flicker);
    gradient.addColorStop(0, 'rgba(150, 0, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(100, 0, 200, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, -h / 2, 16 + flicker, 22 + flicker, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hexagonal body
    ctx.fillStyle = '#a0f';
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        const r = Math.min(w, h) / 2;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    // Core
    ctx.fillStyle = '#f0f';
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fill();

    // Spikes
    ctx.fillStyle = '#80d';
    ctx.fillRect(-w / 2 - 6, -2, 10, 6);
    ctx.fillRect(w / 2 - 4, -2, 10, 6);

    ctx.restore();
}

export function drawEnemyType3(ctx, x, y, w, h, hp, maxHp) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    const flicker = Math.random() * 9;
    const hpRatio = hp / maxHp;

    // Engine glow
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 28 + flicker);
    gradient.addColorStop(0, `rgba(0, 255, 0, 0.9)`);
    gradient.addColorStop(1, 'rgba(0, 200, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 28 + flicker, 0, Math.PI * 2);
    ctx.fill();

    // Large body
    ctx.fillStyle = `rgb(${Math.floor(100 * (1 - hpRatio))}, ${Math.floor(255 * hpRatio)}, 0)`;
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.lineTo(-w / 2, -h / 4);
    ctx.lineTo(-w / 2 - 6, 0);
    ctx.lineTo(-w / 2, h / 4);
    ctx.lineTo(-w / 4, h / 2);
    ctx.lineTo(w / 4, h / 2);
    ctx.lineTo(w / 2, h / 4);
    ctx.lineTo(w / 2 + 6, 0);
    ctx.lineTo(w / 2, -h / 4);
    ctx.closePath();
    ctx.fill();

    // Core
    ctx.fillStyle = `rgba(255, 255, 0, ${0.5 + hpRatio * 0.5})`;
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

export function drawBossType1(ctx, x, y, w, h, hp, maxHp, bodyColor = '#600', armorColor = '#900', coreColor = '#f80') {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    const flicker = Math.random() * 12;
    const hpRatio = hp / maxHp;

    // Engine glow
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 70 + flicker);
    gradient.addColorStop(0, `rgba(255, 100, 0, ${0.4 + hpRatio * 0.2})`);
    gradient.addColorStop(0.5, 'rgba(255, 50, 0, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 70 + flicker, 0, Math.PI * 2);
    ctx.fill();

    // Main hull
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.lineTo(-w / 2.5, -h / 4);
    ctx.lineTo(-w / 2, 0);
    ctx.lineTo(-w / 2 + 14, h / 3);
    ctx.lineTo(-w / 5, h / 2);
    ctx.lineTo(w / 5, h / 2);
    ctx.lineTo(w / 2 - 14, h / 3);
    ctx.lineTo(w / 2, 0);
    ctx.lineTo(w / 2.5, -h / 4);
    ctx.closePath();
    ctx.fill();

    // Armor
    ctx.fillStyle = armorColor;
    ctx.beginPath();
    ctx.moveTo(-w / 3, -h / 6);
    ctx.lineTo(-w / 2, 0);
    ctx.lineTo(-w / 2, h / 6);
    ctx.lineTo(-w / 3, h / 6);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w / 3, -h / 6);
    ctx.lineTo(w / 2, 0);
    ctx.lineTo(w / 2, h / 6);
    ctx.lineTo(w / 3, h / 6);
    ctx.closePath();
    ctx.fill();

    // Core
    const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(255, 255, 0, ${pulse})`;
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();

    // Cannons
    ctx.fillStyle = '#400';
    ctx.fillRect(-w / 2 - 14, -6, 18, 12);
    ctx.fillRect(w / 2 - 4, -6, 18, 12);

    // HP bar
    ctx.fillStyle = '#333';
    ctx.fillRect(-w / 2, -h / 2 - 28, w, 12);
    ctx.fillStyle = hpRatio > 0.3 ? '#f44' : '#f00';
    ctx.fillRect(-w / 2, -h / 2 - 28, w * hpRatio, 12);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(-w / 2, -h / 2 - 28, w, 12);

    ctx.restore();
}

export function drawBossType2(ctx, x, y, w, h, hp, maxHp, bodyColor = '#060', armorColor = '#090', coreColor = '#0f0') {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    const flicker = Math.random() * 15;
    const hpRatio = hp / maxHp;

    // Engine glow
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 80 + flicker);
    gradient.addColorStop(0, `rgba(0, 255, 0, ${0.3 + hpRatio * 0.2})`);
    gradient.addColorStop(0.4, 'rgba(0, 200, 0, 0.15)');
    gradient.addColorStop(1, 'rgba(0, 100, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 80 + flicker, 0, Math.PI * 2);
    ctx.fill();

    // Hexagonal hull
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        const r = Math.min(w, h) * 0.45;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    // Armor plates
    ctx.fillStyle = armorColor;
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i;
        const r1 = Math.min(w, h) * 0.45;
        const r2 = Math.min(w, h) * 0.35;
        const x1 = Math.cos(angle - 0.2) * r1;
        const y1 = Math.sin(angle - 0.2) * r1;
        const x2 = Math.cos(angle) * r2;
        const y2 = Math.sin(angle) * r2;
        const x3 = Math.cos(angle + 0.2) * r1;
        const y3 = Math.sin(angle + 0.2) * r1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
    }

    // Core
    const pulse = Math.sin(Date.now() / 150) * 0.4 + 0.6;
    ctx.fillStyle = coreColor;
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.5})`;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();

    // Side cannons
    ctx.fillStyle = '#040';
    ctx.fillRect(-w / 2 - 10, -h / 4, 16, 8);
    ctx.fillRect(-w / 2 - 10, h / 4 - 8, 16, 8);
    ctx.fillRect(w / 2 - 6, -h / 4, 16, 8);
    ctx.fillRect(w / 2 - 6, h / 4 - 8, 16, 8);

    // HP bar
    ctx.fillStyle = '#333';
    ctx.fillRect(-w / 2, -h / 2 - 28, w, 12);
    ctx.fillStyle = hpRatio > 0.3 ? '#4f4' : '#0f0';
    ctx.fillRect(-w / 2, -h / 2 - 28, w * hpRatio, 12);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(-w / 2, -h / 2 - 28, w, 12);

    ctx.restore();
}

export function drawBossType3(ctx, x, y, w, h, hp, maxHp, bodyColor = '#660', armorColor = '#990', coreColor = '#ff0') {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    const flicker = Math.random() * 10;
    const hpRatio = hp / maxHp;

    // Massive engine glow
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 100 + flicker);
    gradient.addColorStop(0, `rgba(255, 255, 0, ${0.2 + hpRatio * 0.15})`);
    gradient.addColorStop(0.3, 'rgba(200, 200, 0, 0.1)');
    gradient.addColorStop(1, 'rgba(100, 100, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 100 + flicker, 0, Math.PI * 2);
    ctx.fill();

    // Massive hull
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.lineTo(-w / 3, -h / 3);
    ctx.lineTo(-w / 2.5, 0);
    ctx.lineTo(-w / 2, h / 4);
    ctx.lineTo(-w / 3, h / 2);
    ctx.lineTo(-w / 6, h / 2);
    ctx.lineTo(w / 6, h / 2);
    ctx.lineTo(w / 3, h / 2);
    ctx.lineTo(w / 2, h / 4);
    ctx.lineTo(w / 2.5, 0);
    ctx.lineTo(w / 3, -h / 3);
    ctx.closePath();
    ctx.fill();

    // Armor blocks
    ctx.fillStyle = armorColor;
    for (let i = -1; i <= 1; i += 2) {
        ctx.beginPath();
        ctx.moveTo(i * w / 6, -h / 4);
        ctx.lineTo(i * w / 2, 0);
        ctx.lineTo(i * w / 2, h / 8);
        ctx.lineTo(i * w / 3, h / 8);
        ctx.closePath();
        ctx.fill();
    }

    // Triple core
    const pulse = Math.sin(Date.now() / 180) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(255, 255, 0, ${pulse})`;
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(255, 200, 0, ${pulse * 0.6})`;
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();

    // Massive cannons
    ctx.fillStyle = '#440';
    ctx.fillRect(-w / 2 - 20, -10, 24, 20);
    ctx.fillRect(w / 2 - 4, -10, 24, 20);
    ctx.fillRect(-w / 2 - 15, h / 3, 20, 14);
    ctx.fillRect(w / 2 - 5, h / 3, 20, 14);

    // HP bar
    ctx.fillStyle = '#333';
    ctx.fillRect(-w / 2, -h / 2 - 28, w, 12);
    ctx.fillStyle = hpRatio > 0.3 ? '#ff0' : '#f80';
    ctx.fillRect(-w / 2, -h / 2 - 28, w * hpRatio, 12);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(-w / 2, -h / 2 - 28, w, 12);

    ctx.restore();
}

export function drawBoss(ctx, x, y, w, h, hp, maxHp) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    const flicker = Math.random() * 12;

    // Massive engine glow
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 70 + flicker);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
    gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 70 + flicker, 0, Math.PI * 2);
    ctx.fill();

    // Main hull
    ctx.fillStyle = '#600';
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.lineTo(-w / 2.5, -h / 4);
    ctx.lineTo(-w / 2, 0);
    ctx.lineTo(-w / 2 + 14, h / 3);
    ctx.lineTo(-w / 5, h / 2);
    ctx.lineTo(w / 5, h / 2);
    ctx.lineTo(w / 2 - 14, h / 3);
    ctx.lineTo(w / 2, 0);
    ctx.lineTo(w / 2.5, -h / 4);
    ctx.closePath();
    ctx.fill();

    // Armor
    ctx.fillStyle = '#900';
    ctx.beginPath();
    ctx.moveTo(-w / 3, -h / 6);
    ctx.lineTo(-w / 2, 0);
    ctx.lineTo(-w / 2, h / 6);
    ctx.lineTo(-w / 3, h / 6);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w / 3, -h / 6);
    ctx.lineTo(w / 2, 0);
    ctx.lineTo(w / 2, h / 6);
    ctx.lineTo(w / 3, h / 6);
    ctx.closePath();
    ctx.fill();

    // Core
    const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(255, ${Math.floor(255 * pulse)}, 0, ${pulse})`;
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();

    // Cannons
    ctx.fillStyle = '#400';
    ctx.fillRect(-w / 2 - 14, -6, 18, 12);
    ctx.fillRect(w / 2 - 4, -6, 18, 12);

    // HP bar (relative to boss center)
    ctx.fillStyle = '#333';
    ctx.fillRect(-w / 2, -h / 2 - 28, w, 12);
    ctx.fillStyle = hp / maxHp > 0.3 ? '#f44' : '#f00';
    ctx.fillRect(-w / 2, -h / 2 - 28, w * (hp / maxHp), 12);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(-w / 2, -h / 2 - 28, w, 12);

    ctx.restore();
}

export function drawBullet(ctx, bullet) {
    ctx.save();
    ctx.translate(bullet.x, bullet.y);

    if (bullet.isEnemy) {
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 10);
        grad.addColorStop(0, '#0f0');
        grad.addColorStop(0.6, 'rgba(0, 180, 0, 0.4)');
        grad.addColorStop(1, 'rgba(0, 100, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#4f4';
        ctx.fillRect(-3, -12, 6, 24);

        const trail = ctx.createLinearGradient(0, -12, 0, 30);
        trail.addColorStop(0, 'rgba(0, 255, 0, 0.6)');
        trail.addColorStop(1, 'rgba(0, 200, 0, 0)');
        ctx.fillStyle = trail;
        ctx.fillRect(-2, -12, 4, 30);
    } else if (bullet.isPowerShot) {
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 18);
        grad.addColorStop(0, '#fff');
        grad.addColorStop(0.2, '#ff0');
        grad.addColorStop(0.6, '#f80');
        grad.addColorStop(1, 'rgba(255, 150, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff0';
        ctx.fillRect(-4, -18, 8, 36);

        const trail = ctx.createLinearGradient(0, -18, 0, 50);
        trail.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
        trail.addColorStop(1, 'rgba(255, 128, 0, 0)');
        ctx.fillStyle = trail;
        ctx.fillRect(-3, -18, 6, 50);
    } else {
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 8);
        grad.addColorStop(0, '#fff');
        grad.addColorStop(0.3, '#ff0');
        grad.addColorStop(1, 'rgba(255, 200, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f80';
        ctx.fillRect(-3, -12, 6, 24);

        const trail = ctx.createLinearGradient(0, -12, 0, 30);
        trail.addColorStop(0, 'rgba(255, 200, 0, 0.6)');
        trail.addColorStop(1, 'rgba(255, 150, 0, 0)');
        ctx.fillStyle = trail;
        ctx.fillRect(-2, -12, 4, 30);
    }

    ctx.restore();
}

export function drawPowerup(ctx, pu, frame) {
    ctx.save();
    ctx.translate(pu.x + pu.w / 2, pu.y + pu.h / 2);

    const bob = Math.sin(Date.now() / 300) * 3;
    const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
    const scale = 1 + Math.sin(Date.now() / 400) * 0.1;
    ctx.translate(0, bob);
    ctx.scale(scale, scale);

    let color, accentColor;
    switch (pu.type) {
        case 'health':
            color = '#ff69b4'; accentColor = '#ffb3d9';
            break;
        case 'power':
            color = '#f80'; accentColor = '#ff0';
            break;
        case 'bomb':
            color = '#888'; accentColor = '#aaa';
            break;
        default:
            color = '#0055cc'; accentColor = '#4488ff';
    }

    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 24);
    const alpha = (hex) => {
        const expanded = hex.length === 4
            ? '#' + hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3]
            : hex;
        const r = parseInt(expanded.slice(1, 3), 16);
        const g = parseInt(expanded.slice(3, 5), 16);
        const b = parseInt(expanded.slice(5, 7), 16);
        return `rgba(${r},${g},${b}`;
    };
    grad.addColorStop(0, alpha(color) + ',0.4)');
    grad.addColorStop(0.5, alpha(color) + ',0.13)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.fill();

    const s = 9;
    let sprite;
    switch (pu.type) {
        case 'health':
            sprite = [
                [0,1,1,0,1,1,0],
                [1,1,1,0,1,1,1],
                [1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1],
                [0,1,1,1,1,1,0],
                [0,0,1,1,1,0,0],
                [0,0,0,1,0,0,0]
            ];
            break;
        case 'power':
            sprite = [
                [0,1,1,1,0],
                [1,1,1,0,0],
                [0,0,1,1,0],
                [0,1,1,0,0],
                [0,0,1,1,0],
                [0,0,0,1,0]
            ];
            break;
        case 'bomb':
            sprite = [
                [0,0,0,0,2,0,0,0,0],
                [0,0,0,0,2,0,0,0,0],
                [0,0,0,0,2,0,0,0,0],
                [0,0,0,1,1,1,0,0,0],
                [0,1,1,1,1,1,1,1,0],
                [1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1],
                [0,1,1,1,1,1,1,1,0],
                [0,0,0,1,1,1,0,0,0]
            ];
            break;
        default:
            sprite = [
                [0,0,1,1,1,1,1,1,0,0],
                [0,1,1,1,1,1,1,1,1,0],
                [1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1],
                [0,1,1,1,1,1,1,1,1,0],
                [0,1,1,1,1,1,1,1,1,0],
                [0,0,1,1,1,1,1,1,0,0],
                [0,0,0,1,1,1,1,0,0,0]
            ];
    }

    const rows = sprite.length;
    const cols = sprite[0].length;
    const ox = -(cols * s) / 2;
    const oy = -(rows * s) / 2;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (sprite[r][c]) {
                const flicker = Math.random() * 0.15;
                ctx.fillStyle = sprite[r][c] === 2 ? '#fff' : color;
                ctx.fillRect(ox + c * s, oy + r * s, s, s);
                if ((r + c + frame) % 4 === 0) {
                    ctx.fillStyle = sprite[r][c] === 2 ? '#fff' : accentColor;
                    ctx.fillRect(ox + c * s, oy + r * s, s, 1);
                }
            }
        }
    }

    ctx.restore();
}

export function drawParticles(ctx, particles) {
    for (const pt of particles) {
        ctx.globalAlpha = pt.life;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

export function drawStars(ctx, stars, time) {
    for (const s of stars) {
        const alpha = s.brightness * (0.7 + Math.sin(time / 1000 + s.x * 0.01) * 0.3);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(s.x, s.y, s.size, s.size);
    }
}

export function updateStars(stars, canvasWidth, canvasHeight) {
    for (const s of stars) {
        s.y += s.speed;
        if (s.y > canvasHeight) {
            s.y = 0;
            s.x = Math.random() * canvasWidth;
        }
    }
}
