import { useState, useRef, useCallback, useEffect } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT, ASPECT_RATIO } from '../game/constants.js';

export function useResponsiveCanvas(containerRef, onCanvasReady) {
    const canvasRef = useRef(null);
    const [scale, setScale] = useState(1);

    const handleResize = useCallback(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const scaleByWidth = containerWidth / CANVAS_WIDTH;
        const scaleByHeight = containerHeight / CANVAS_HEIGHT;
            const newScale = Math.min(scaleByWidth, scaleByHeight);

        setScale(newScale);

        canvasRef.current.style.width = `${Math.floor(CANVAS_WIDTH * newScale)}px`;
        canvasRef.current.style.height = `${Math.floor(CANVAS_HEIGHT * newScale)}px`;

        if (onCanvasReady) {
            onCanvasReady(canvasRef.current);
        }
    }, [containerRef, onCanvasReady]);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return { canvasRef, scale };
}
