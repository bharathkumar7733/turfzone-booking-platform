import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, LogOut, Home, Calendar } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function Navbar() {
  const [location] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Don't show navbar on the home page
  if (location === '/') {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neon-orange/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-home-logo">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-neon-orange transition-colors">
              <div className="text-2xl font-bold neon-text">TurfZone</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" data-testid="link-nav-home">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 ${
                  location === '/' ? 'text-neon-orange' : 'text-white hover:text-neon-orange'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
            </Link>

            <Link href="/sports" data-testid="link-nav-sports">
              <Button
                variant="ghost"
                className={`${
                  location.startsWith('/sports') || location.startsWith('/turfs') || location.startsWith('/slots')
                    ? 'text-neon-orange' 
                    : 'text-white hover:text-neon-orange'
                }`}
              >
                Sports
              </Button>
            </Link>

            {isAuthenticated && (
              <Link href="/my-bookings" data-testid="link-nav-bookings">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 ${
                    location === '/my-bookings' ? 'text-neon-orange' : 'text-white hover:text-neon-orange'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>My Bookings</span>
                </Button>
              </Link>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2" data-testid="user-info">
                  <User className="w-4 h-4 text-neon-orange" />
                  <span className="text-white font-medium" data-testid="text-user-name">{user?.name}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-red-400 flex items-center space-x-2"
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" data-testid="link-nav-login">
                  <Button
                    variant="ghost"
                    className={`${
                      location === '/login' ? 'text-neon-orange' : 'text-white hover:text-neon-orange'
                    }`}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" data-testid="link-nav-register">
                  <Button
                    className="bg-neon-orange hover:bg-orange-600 text-black font-bold px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation (if needed) */}
      <div className="md:hidden px-4 pb-4 border-t border-neon-orange/30">
        <div className="flex flex-col space-y-2 pt-4">
          <Link href="/" data-testid="link-mobile-home">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-neon-orange">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link href="/sports" data-testid="link-mobile-sports">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-neon-orange">
              Sports
            </Button>
          </Link>
          {isAuthenticated && (
            <Link href="/my-bookings" data-testid="link-mobile-bookings">
              <Button variant="ghost" className="w-full justify-start text-white hover:text-neon-orange">
                <Calendar className="w-4 h-4 mr-2" />
                My Bookings
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}