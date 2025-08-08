import { type User, type InsertUser, type Turf, type InsertTurf, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Turf methods
  getTurf(id: string): Promise<Turf | undefined>;
  getTurfsBySport(sport: string): Promise<Turf[]>;
  getAllTurfs(): Promise<Turf[]>;
  
  // Booking methods
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private turfs: Map<string, Turf>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.turfs = new Map();
    this.bookings = new Map();
    this.initializeTurfs();
  }

  private initializeTurfs() {
    const sampleTurfs: Turf[] = [
      {
        id: "1",
        name: "Champions Cricket Ground",
        sport: "cricket",
        address: "Sector 15, Gurgaon",
        rating: 48,
        price: 2000,
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        id: "2",
        name: "Elite Sports Arena",
        sport: "cricket",
        address: "MG Road, Bangalore",
        rating: 46,
        price: 1800,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        id: "3",
        name: "Premium Cricket Club",
        sport: "cricket",
        address: "Andheri West, Mumbai",
        rating: 49,
        price: 2500,
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        id: "4",
        name: "City Football Complex",
        sport: "football",
        address: "Salt Lake, Kolkata",
        rating: 47,
        price: 1500,
        imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        id: "5",
        name: "Metro Football Ground",
        sport: "football",
        address: "Connaught Place, Delhi",
        rating: 45,
        price: 1600,
        imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        id: "6",
        name: "Ace Badminton Center",
        sport: "badminton",
        address: "Koramangala, Bangalore",
        rating: 48,
        price: 800,
        imageUrl: "https://images.unsplash.com/photo-1544737151-6e4b01da9d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        id: "7",
        name: "Modern Pickleball Courts",
        sport: "pickleball",
        address: "Bandra, Mumbai",
        rating: 46,
        price: 1000,
        imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        id: "8",
        name: "Royal Snooker Lounge",
        sport: "snooker",
        address: "Golf Course Road, Gurgaon",
        rating: 49,
        price: 600,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      }
    ];

    sampleTurfs.forEach(turf => {
      this.turfs.set(turf.id, turf);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getTurf(id: string): Promise<Turf | undefined> {
    return this.turfs.get(id);
  }

  async getTurfsBySport(sport: string): Promise<Turf[]> {
    return Array.from(this.turfs.values()).filter(turf => turf.sport === sport);
  }

  async getAllTurfs(): Promise<Turf[]> {
    return Array.from(this.turfs.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id,
      status: insertBooking.status || 'confirmed',
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
