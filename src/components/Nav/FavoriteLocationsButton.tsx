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

import { Card } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { BsHeart, BsGeoAlt } from 'react-icons/bs';

export const FavoriteLocationsButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const favoriteLocations = getCookie('favorites');
  const favoriteLocationsArray = favoriteLocations
    ? JSON.parse(favoriteLocations)
    : [];

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="outline" title="Favorite Locations">
          <BsHeart />
        </Button>
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
                    <BsGeoAlt /> {city.name}
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
