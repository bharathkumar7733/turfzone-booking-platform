import { Link } from 'wouter';
import { NeonCard } from '@/components/ui/neon-card';
import { SPORTS_DATA } from '@/lib/types';

export default function Sports() {
  return (
    <div className="min-h-screen bg-dark-bg relative z-10 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text" data-testid="text-page-title">Select Your Sport</h1>
          <p className="text-gray-300 text-lg" data-testid="text-page-description">Choose from our premium sports facilities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPORTS_DATA.map((sport) => (
            <Link key={sport.id} href={`/turfs/${sport.id}`} data-testid={`link-sport-${sport.id}`}>
              <NeonCard hover className="overflow-hidden">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4" data-testid={`emoji-${sport.id}`}>{sport.emoji}</div>
                  <h3 className="text-2xl font-bold" data-testid={`text-${sport.id}-name`}>{sport.name}</h3>
                </div>
                <p className="text-gray-300 mb-4" data-testid={`text-${sport.id}-description`}>{sport.description}</p>
                <div className="text-neon-orange font-semibold" data-testid={`text-${sport.id}-count`}>
                  {sport.availableCount} Turfs Available
                </div>
              </NeonCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}