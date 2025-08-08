import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NeonCard } from '@/components/ui/neon-card';
import { Skeleton } from '@/components/ui/skeleton';
import { SPORTS_DATA } from '@/lib/types';
import type { Turf } from '@shared/schema';

export default function Turfs() {
  const { sport } = useParams();
  const sportData = SPORTS_DATA.find(s => s.id === sport);

  const { data: turfs, isLoading, error } = useQuery<Turf[]>({
    queryKey: ['/api/turfs', sport],
    queryFn: async () => {
      const response = await fetch(`/api/turfs?sport=${sport}`);
      if (!response.ok) throw new Error('Failed to fetch turfs');
      return response.json();
    },
  });

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4" data-testid="text-error">Error Loading Turfs</h2>
          <p className="text-gray-300" data-testid="text-error-message">Failed to load turfs. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg relative z-10 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <Link href="/sports" data-testid="link-back-sports">
            <Button variant="ghost" className="text-neon-orange hover:text-orange-400 flex items-center mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Sports
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text" data-testid="text-page-title">
            {sportData?.name} Turfs
          </h1>
          <p className="text-gray-300 text-lg" data-testid="text-page-description">
            Choose from our premium {sportData?.name.toLowerCase()} facilities
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <NeonCard key={i}>
                <Skeleton className="w-full h-48 mb-4 bg-gray-700" />
                <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700" />
                <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                <Skeleton className="h-4 w-1/2 bg-gray-700" />
              </NeonCard>
            ))}
          </div>
        ) : turfs && turfs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-turfs">
            {turfs.map((turf) => (
              <NeonCard key={turf.id} hover data-testid={`card-turf-${turf.id}`}>
                <img 
                  src={turf.imageUrl} 
                  alt={turf.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  data-testid={`img-turf-${turf.id}`}
                />
                <h3 className="text-xl font-bold mb-2" data-testid={`text-turf-name-${turf.id}`}>{turf.name}</h3>
                <p className="text-gray-300 mb-2" data-testid={`text-turf-address-${turf.id}`}>{turf.address}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center" data-testid={`rating-${turf.id}`}>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1">{(turf.rating / 10).toFixed(1)}</span>
                  </div>
                  <div className="text-neon-orange font-bold" data-testid={`price-${turf.id}`}>
                    ₹{turf.price}/2hrs
                  </div>
                </div>
                <Link href={`/slots/${turf.id}`} data-testid={`link-view-slots-${turf.id}`}>
                  <Button className="w-full bg-neon-orange hover:bg-orange-600 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300">
                    View Slots
                  </Button>
                </Link>
              </NeonCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏟️</div>
            <h3 className="text-2xl font-bold mb-4" data-testid="text-no-turfs">No Turfs Available</h3>
            <p className="text-gray-300 mb-6" data-testid="text-no-turfs-message">
              No {sportData?.name.toLowerCase()} turfs are currently available.
            </p>
            <Link href="/sports" data-testid="link-browse-other-sports">
              <Button className="bg-neon-orange hover:bg-orange-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300">
                Browse Other Sports
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}