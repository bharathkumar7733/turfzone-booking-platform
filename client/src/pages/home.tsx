import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { NeonCard } from '@/components/ui/neon-card';
import CricketAnimation from '@/components/3d/cricket-animation';
import { SPORTS_DATA } from '@/lib/types';

export default function Home() {
  return (
    <div className="min-h-screen cricket-stadium-bg">
      <CricketAnimation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text animate-float" data-testid="text-hero-title">
            Book Your Turf Now
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
            Experience the thrill of sports with premium turf bookings across the city
          </p>
          <Link href="/sports" data-testid="link-explore-sports">
            <Button className="bg-neon-orange hover:bg-orange-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 animate-glow">
              Explore Sports
            </Button>
          </Link>
        </div>
      </section>

      {/* Sports Selection Section */}
      <section className="py-20 bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 neon-text" data-testid="text-sports-title">Choose Your Sport</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {SPORTS_DATA.map((sport) => (
              <Link key={sport.id} href={`/turfs/${sport.id}`} data-testid={`link-sport-${sport.id}`}>
                <NeonCard hover className="text-center">
                  <div className="text-6xl mb-4" data-testid={`emoji-${sport.id}`}>{sport.emoji}</div>
                  <h3 className="text-lg font-semibold" data-testid={`text-${sport.id}-name`}>{sport.name}</h3>
                </NeonCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}