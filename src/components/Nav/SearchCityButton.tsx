import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { searchCity } from '@/actions/searchCity';

import { useFormStatus, useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Search } from 'lucide-react';

export const SearchCityButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const [citiesServer, formAction] = useFormState(searchCity, {
    results: [],
  });
  const [cities, setCities]: any = useState([null]);

  const { toast } = useToast();

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" size="sm" className="flex items-center gap-2 px-3">
        <Search className="h-[1.2rem] w-[1.2rem]" />
        {pending ? 'Searching...' : 'Search'}
      </Button>
    );
  };

  useEffect(() => {
    setCities(citiesServer);

    if (citiesServer.error) {
      toast({
        title: 'Error',
        description: citiesServer.message,
        variant: 'destructive',
      });
    }
  }, [citiesServer]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              onClick={() => setOpenModal(true)}
            >
              <Search className="h-[1.2rem] w-[1.2rem]" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Search a city</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder="Name of your city"
              name="city"
              required
            />
          </div>
          <SubmitButton />
        </form>

        <div id="results" className="flex flex-col gap-2">
          {cities.results?.map((city: any) => (
            <Link
              href={`/city?query=${city.lat},${city.lon}`}
              key={city.country + city.name}
              onClick={() => {
                setOpenModal(false);
                setCities([]);
              }}
            >
              <Card className="p-3">
                <b className="flex items-center gap-2">
                  <MapPin className="h-[1.2rem] w-[1.2rem]" /> {city.name}
                </b>

                <span className="opacity-75">{city.country}</span>
              </Card>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
