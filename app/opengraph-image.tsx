import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Ishaan Mishra: backend engineering and computer vision';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020617', // slate-950
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Faint Blueprint Grid Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating Content Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: '60px 80px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            backgroundColor: 'rgba(2, 6, 23, 0.8)', // Frosted slate-950
            boxShadow: '0 0 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Monogram Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              backgroundColor: '#f8fafc',
              color: '#020617',
              fontSize: '32px',
              fontWeight: 'bold',
              borderRadius: '12px',
              marginBottom: '32px',
            }}
          >
            IM
          </div>

          <h1
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#f8fafc', // slate-50
              margin: '0 0 16px 0',
              letterSpacing: '-0.05em',
            }}
          >
            Ishaan Mishra
          </h1>
          
          <p
            style={{
              fontSize: '36px',
              color: '#94a3b8', // slate-400
              margin: 0,
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}
          >
            Backend <span style={{ color: '#475569', margin: '0 12px' }}>·</span> Computer Vision
          </p>

          {/* Tech Badges */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '48px' }}>
            <span style={{ color: '#cbd5e1', fontSize: '20px', border: '1px solid #334155', padding: '8px 24px', borderRadius: '40px' }}>Next.js</span>
            <span style={{ color: '#cbd5e1', fontSize: '20px', border: '1px solid #334155', padding: '8px 24px', borderRadius: '40px' }}>Spring Boot</span>
            <span style={{ color: '#cbd5e1', fontSize: '20px', border: '1px solid #334155', padding: '8px 24px', borderRadius: '40px' }}>Python</span>
            <span style={{ color: '#cbd5e1', fontSize: '20px', border: '1px solid #334155', padding: '8px 24px', borderRadius: '40px' }}>Deep Learning</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}