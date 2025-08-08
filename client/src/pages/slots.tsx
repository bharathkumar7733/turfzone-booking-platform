import { useState } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NeonCard } from '@/components/ui/neon-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { apiRequest } from '@/lib/queryClient';
import { TIME_SLOTS } from '@/lib/types';
import type { Turf, InsertBooking } from '@shared/schema';

export default function Slots() {
  const { turfId } = useParams();
  const [, setLocation] = useLocation();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { isAuthenticated, token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: turf, isLoading, error } = useQuery<Turf>({
    queryKey: ['/api/turfs', turfId],
    queryFn: async () => {
      const response = await fetch(`/api/turfs/${turfId}`);
      if (!response.ok) throw new Error('Failed to fetch turf');
      return response.json();
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: InsertBooking) => {
      return apiRequest('POST', '/api/bookings', bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: "Booking Confirmed!",
        description: "Your turf has been booked successfully.",
      });
      setLocation('/my-bookings');
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSlotSelect = (slotId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to book a slot.",
        variant: "destructive",
      });
      setLocation('/login');
      return;
    }
    
    setSelectedSlot(slotId);
    setShowConfirmation(true);
  };

  const handleConfirmBooking = () => {
    if (!turf || !selectedSlot) return;

    const slot = TIME_SLOTS.find(s => s.id === selectedSlot);
    if (!slot) return;

    const bookingData: InsertBooking = {
      userId: '', // This will be set by the server
      turfId: turf.id,
      sport: turf.sport,
      slot: slot.label,
      date: new Date().toLocaleDateString(),
      status: 'confirmed'
    };

    bookingMutation.mutate(bookingData);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4" data-testid="text-error">Error Loading Turf</h2>
          <p className="text-gray-300" data-testid="text-error-message">Failed to load turf details. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg relative z-10 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <Link href={`/turfs/${turf?.sport}`} data-testid="link-back-turfs">
            <Button variant="ghost" className="text-neon-orange hover:text-orange-400 flex items-center mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Turfs
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4 neon-text" data-testid="text-page-title">Select Time Slot</h1>
          
          {isLoading ? (
            <NeonCard>
              <Skeleton className="h-20 w-full bg-gray-700" />
            </NeonCard>
          ) : turf ? (
            <NeonCard data-testid="card-turf-info">
              <div className="flex items-center space-x-4">
                <img src={turf.imageUrl} alt={turf.name} className="w-20 h-20 rounded-lg object-cover" data-testid="img-turf" />
                <div>
                  <h3 className="text-xl font-bold" data-testid="text-turf-name">{turf.name}</h3>
                  <p className="text-gray-300" data-testid="text-turf-address">{turf.address}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 mr-4" data-testid="text-turf-rating">{(turf.rating / 10).toFixed(1)}</span>
                    <span className="text-neon-orange font-bold" data-testid="text-turf-price">₹{turf.price}/2hrs</span>
                  </div>
                </div>
              </div>
            </NeonCard>
          ) : null}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" data-testid="grid-time-slots">
          {TIME_SLOTS.map((slot) => (
            <NeonCard
              key={slot.id}
              className={`text-center cursor-pointer transition-all duration-300 ${
                slot.available 
                  ? 'hover:bg-neon-orange hover:text-black' 
                  : 'opacity-50 cursor-not-allowed border-gray-600'
              } ${selectedSlot === slot.id ? 'bg-neon-orange text-black' : ''}`}
              onClick={() => slot.available && handleSlotSelect(slot.id)}
              data-testid={`slot-${slot.id}`}
            >
              <div className="font-semibold" data-testid={`text-slot-time-${slot.id}`}>{slot.label}</div>
              <div className={`text-sm ${slot.available ? 'text-green-400' : 'text-red-400'}`} data-testid={`text-slot-status-${slot.id}`}>
                {slot.available ? 'Available' : 'Booked'}
              </div>
            </NeonCard>
          ))}
        </div>

        {showConfirmation && selectedSlot && turf && (
          <NeonCard data-testid="card-booking-confirmation">
            <h3 className="text-2xl font-bold mb-4 neon-text">Confirm Your Booking</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold text-neon-orange" data-testid="text-turf-details-header">Turf Details</h4>
                <p data-testid="text-booking-turf-name">{turf.name}</p>
                <p className="text-gray-300" data-testid="text-booking-turf-address">{turf.address}</p>
              </div>
              <div>
                <h4 className="font-semibold text-neon-orange" data-testid="text-booking-details-header">Booking Details</h4>
                <p data-testid="text-booking-date">Date: {new Date().toLocaleDateString()}</p>
                <p data-testid="text-booking-time">Time: {TIME_SLOTS.find(s => s.id === selectedSlot)?.label}</p>
                <p className="font-bold" data-testid="text-booking-total">Total: ₹{turf.price}</p>
              </div>
            </div>
            <Button 
              onClick={handleConfirmBooking}
              disabled={bookingMutation.isPending}
              className="bg-neon-orange hover:bg-orange-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 animate-glow"
              data-testid="button-confirm-booking"
            >
              {bookingMutation.isPending ? 'Booking...' : 'Confirm & Book'}
            </Button>
          </NeonCard>
        )}
      </div>
    </div>
  );
}