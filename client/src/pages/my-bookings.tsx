import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NeonCard } from '@/components/ui/neon-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import type { Booking } from '@shared/schema';

export default function MyBookings() {
  const { isAuthenticated, user } = useAuth();

  const { data: bookings, isLoading, error } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-bg relative z-10 pt-20 flex items-center justify-center">
        <NeonCard>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 neon-text" data-testid="text-auth-required">Login Required</h2>
            <p className="text-gray-300 mb-6" data-testid="text-login-message">Please login to view your bookings.</p>
            <Link href="/login" data-testid="link-login">
              <Button className="bg-neon-orange hover:bg-orange-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300">
                Login Now
              </Button>
            </Link>
          </div>
        </NeonCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4" data-testid="text-error">Error Loading Bookings</h2>
          <p className="text-gray-300" data-testid="text-error-message">Failed to load your bookings. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg relative z-10 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text" data-testid="text-page-title">My Bookings</h1>
          <p className="text-gray-300 text-lg" data-testid="text-page-description">
            Welcome back, {user?.name}! Here are your turf bookings.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <NeonCard key={i}>
                <Skeleton className="w-full h-48 mb-4 bg-gray-700" />
                <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700" />
                <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                <Skeleton className="h-4 w-1/2 bg-gray-700" />
              </NeonCard>
            ))}
          </div>
        ) : bookings && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-bookings">
            {bookings.map((booking) => (
              <NeonCard key={booking.id} data-testid={`card-booking-${booking.id}`}>
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                    className={`${
                      booking.status === 'confirmed'
                        ? 'bg-green-600 text-white'
                        : booking.status === 'pending'
                        ? 'bg-yellow-600 text-black'
                        : 'bg-red-600 text-white'
                    }`}
                    data-testid={`badge-status-${booking.id}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                  <div className="text-2xl" data-testid={`emoji-sport-${booking.id}`}>
                    {booking.sport === 'cricket' ? '🏏' : 
                     booking.sport === 'football' ? '⚽' : 
                     booking.sport === 'badminton' ? '🏸' : 
                     booking.sport === 'pickleball' ? '🏓' : 
                     booking.sport === 'snooker' ? '🎱' : '🏟️'}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 capitalize" data-testid={`text-sport-${booking.id}`}>
                  {booking.sport}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300" data-testid={`booking-date-${booking.id}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center text-gray-300" data-testid={`booking-slot-${booking.id}`}>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{booking.slot}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-2" data-testid={`booking-id-${booking.id}`}>
                    Booking ID: {booking.id}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-neon-orange font-semibold" data-testid={`booking-turf-${booking.id}`}>
                      Turf #{booking.turfId}
                    </span>
                    {booking.status === 'confirmed' && (
                      <Badge className="bg-neon-orange text-black" data-testid={`badge-confirmed-${booking.id}`}>
                        Confirmed
                      </Badge>
                    )}
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏟️</div>
            <h3 className="text-2xl font-bold mb-4" data-testid="text-no-bookings">No Bookings Yet</h3>
            <p className="text-gray-300 mb-6" data-testid="text-no-bookings-message">
              You haven't made any turf bookings yet. Start exploring our sports facilities!
            </p>
            <Link href="/sports" data-testid="link-browse-sports">
              <Button className="bg-neon-orange hover:bg-orange-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300">
                Browse Sports
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}