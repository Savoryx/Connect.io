import React from 'react';
import VideoHero from '../components/VideoHero';
import DownSection from '../components/DownSection';

function Home() {
  return (
    <div className="flex flex-col bg-[#121212] w-full">
      {/* Hero Section */}
      <section className="w-full">
        <VideoHero />
      </section>

      {/* Down Section */}
      <section className="w-full">
        <DownSection />
      </section>
    </div>
  );
}

export default Home;