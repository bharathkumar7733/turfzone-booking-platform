import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function NeonCard({ children, className, hover = false, onClick }: NeonCardProps) {
  return (
    <Card
      className={cn(
        'glass-effect neon-border bg-card-dark/80 border-neon-orange/30',
        hover && 'hover:scale-105 transition-all duration-300 cursor-pointer hover:border-neon-orange hover:shadow-[0_0_30px_rgba(255,102,0,0.5)]',
        className
      )}
      onClick={onClick}
      data-testid="neon-card"
    >
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}