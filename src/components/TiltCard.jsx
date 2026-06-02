import React, { useRef } from 'react';

export default function TiltCard({ children, className, onClick, style = {}, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Calculate percentage offset from center (-0.5 to 0.5)
    const xc = (x / width) - 0.5;
    const yc = (y / height) - 0.5;

    // Limit rotation to max 25 degrees
    const rotateY = xc * 25; 
    const rotateX = -yc * 25; 

    // Apply transform and glow/shadow shift
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    
    // Dynamic shadow matching cursor angle
    const shadowX = -xc * 15;
    const shadowY = -yc * 15;
    card.style.boxShadow = `${shadowX}px ${shadowY}px 30px var(--gold-glow)`;
    
    // Parallax inner details (if they exist)
    const depthElements = card.querySelectorAll('.tilt-depth');
    depthElements.forEach(el => {
      el.style.transform = `translateZ(30px) scale(0.95)`;
      el.style.transition = 'transform 0.1s ease';
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = 'none';
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

    const depthElements = card.querySelectorAll('.tilt-depth');
    depthElements.forEach(el => {
      el.style.transform = 'translateZ(0px) scale(1)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease, box-shadow 0.1s ease',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
