import { useState } from 'react';
import Link from 'next/link';
import { getCookie } from '@/lib/getCookie';

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

import { Card } from '@/components/ui/card';

import { Heart, MapPin } from 'lucide-react';

export const FavoriteLocationsButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const favoriteLocations = getCookie('favorites');
  const favoriteLocationsArray = favoriteLocations
    ? JSON.parse(favoriteLocations)
    : [];

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              onClick={() => setOpenModal(true)}
            >
              <Heart className="h-[1.2rem] w-[1.2rem]" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Favorite locations</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Favorite Locations</DialogTitle>
        </DialogHeader>

        <div id="results" className="flex flex-col gap-2">
          {favoriteLocationsArray.map((city: any) => (
            <Link
              href={`/city?query=${city.name}`}
              key={city}
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <Card className="p-3 flex justify-between items-center">
                <div>
                  <b className="flex items-center gap-2">
                    <MapPin className="h-[1.2rem] w-[1.2rem]" /> {city.name}
                  </b>

                  <span className="opacity-75">{city.country}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
