import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { insertUserSchema, type InsertUser } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { NeonCard } from '@/components/ui/neon-card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      age: 18,
      gender: '',
      mobile: ''
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: InsertUser) => {
      return apiRequest('POST', '/api/auth/register', userData);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Please login with your credentials.",
      });
      setLocation('/login');
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertUser) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-dark-bg relative z-10 pt-20 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <NeonCard>
          <h1 className="text-3xl font-bold text-center mb-8 neon-text" data-testid="text-page-title">Register</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-register">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-black/50 border-neon-orange/30 focus:border-neon-orange focus:ring-neon-orange/50"
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        className="bg-black/50 border-neon-orange/30 focus:border-neon-orange focus:ring-neon-orange/50"
                        data-testid="input-age"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/50 border-neon-orange/30 focus:border-neon-orange focus:ring-neon-orange/50" data-testid="select-gender">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male" data-testid="option-male">Male</SelectItem>
                        <SelectItem value="female" data-testid="option-female">Female</SelectItem>
                        <SelectItem value="other" data-testid="option-other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="email"
                        className="bg-black/50 border-neon-orange/30 focus:border-neon-orange focus:ring-neon-orange/50"
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="tel"
                        className="bg-black/50 border-neon-orange/30 focus:border-neon-orange focus:ring-neon-orange/50"
                        data-testid="input-mobile"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password"
                        className="bg-black/50 border-neon-orange/30 focus:border-neon-orange focus:ring-neon-orange/50"
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={registerMutation.isPending}
                className="w-full bg-neon-orange hover:bg-orange-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 animate-glow"
                data-testid="button-register"
              >
                {registerMutation.isPending ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </Form>

          <p className="text-center mt-4 text-gray-300">
            Already have an account?{' '}
            <Link href="/login" data-testid="link-login">
              <span className="text-neon-orange hover:text-orange-400 cursor-pointer">Login here</span>
            </Link>
          </p>
        </NeonCard>
      </div>
    </div>
  );
}