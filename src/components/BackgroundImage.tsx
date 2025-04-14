import Image from 'next/image';

export default function BackgroundImage() {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      backgroundColor: '#f0f2f5'
    }}>
      <Image
        src="/background.jpg"
        alt="Hospital Layout"
        layout="fill"
        objectFit="contain"
        priority
      />
      {/* <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        color: '#666',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
      }}>
        <span>6:30</span>
        <span>12:30</span>
      </div> */}
    </div>
  );
} 