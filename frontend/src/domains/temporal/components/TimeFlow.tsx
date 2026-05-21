import React, { useEffect, useRef } from 'react';
import useTemporalStore from '../hooks/useTemporalStore';

const TimeFlow: React.FC = () => {
  const { timeOfDay } = useTemporalStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 时间流动粒子
    const particles: { x: number; y: number; speed: number; opacity: number; size: number }[] = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        size: Math.random() * 2 + 1
      });
    }
    
    // 获取时间阶段颜色
    const getTimeColors = () => {
      switch(timeOfDay) {
        case 'morning':
          return { start: '#fbbf24', end: '#f59e0b', bg: '#fef3c7' };
        case 'day':
          return { start: '#60a5fa', end: '#3b82f6', bg: '#dbeafe' };
        case 'evening':
          return { start: '#a78bfa', end: '#8b5cf6', bg: '#ede9fe' };
      }
    };
    
    let animationId: number;
    
    const animate = () => {
      const colors = getTimeColors();
      
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 绘制流动线条
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, colors.start);
      gradient.addColorStop(1, colors.end);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.15;
      
      // 绘制多条流动线条
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (canvas.height / 5) * i);
        
        for (let x = 0; x < canvas.width; x += 10) {
          const y = (canvas.height / 5) * i + Math.sin((x + Date.now() * 0.001) * 0.01 + i) * 20;
          ctx.lineTo(x, y);
        }
        
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
      
      // 更新和绘制粒子
      particles.forEach((particle, index) => {
        // 移动粒子
        particle.x += particle.speed;
        particle.y += Math.sin(Date.now() * 0.001 + index) * 0.3;
        
        // 重置位置
        if (particle.x > canvas.width) {
          particle.x = -10;
          particle.y = Math.random() * canvas.height;
        }
        
        // 绘制粒子
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.start;
        ctx.globalAlpha = particle.opacity + Math.sin(Date.now() * 0.002 + index) * 0.2;
        ctx.fill();
        
        // 绘制粒子光晕
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = colors.start;
        ctx.globalAlpha = particle.opacity * 0.3;
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [timeOfDay]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
      />
    </div>
  );
};

export default TimeFlow;
