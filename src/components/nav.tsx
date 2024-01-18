'use client';

import { ModeToggle } from './mode-toggle';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BsGeoAlt, BsHeart, BsSearch } from 'react-icons/bs';
import { searchCity } from '@/actions/searchCity';
import { useFormStatus, useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from './ui/card';

import Image from 'next/image';
import { getCookie } from '@/lib/getCookie';
import { setCookie } from '@/lib/setCookie';
import { Trash } from 'lucide-react';

const SearchCityDialog = () => {
  const [openModal, setOpenModal] = useState(false);
  const [citiesServer, formAction] = useFormState(searchCity, {
    results: [],
  });
  const [cities, setCities]: any = useState([null]);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" size="sm" className="flex items-center gap-2 px-3">
        <BsSearch />
        {pending ? 'Searching...' : 'Search'}
      </Button>
    );
  };

  useEffect(() => {
    setCities(citiesServer);

    if (citiesServer.error) {
      alert(citiesServer.message);
    }
  }, [citiesServer]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Search Location"
          onClick={() => setOpenModal(true)}
        >
          <BsSearch />
        </Button>
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
              key={city}
              onClick={() => {
                setOpenModal(false);
                setCities([]);
              }}
            >
              <Card className="p-3">
                <b className="flex items-center gap-2">
                  <BsGeoAlt /> {city.name}
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

const GeoLocationButton = () => {
  const router = useRouter();

  const getLatLng = () => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        router.push(`/city?query=${latitude},${longitude}`);
      });
    } else {
      alert('Sorry. Geolocation is not supported by your browser.');
    }
  };

  return (
    <Button variant="outline" title="Locate me" onClick={getLatLng}>
      <BsGeoAlt />
    </Button>
  );
};

const FavoriteLocationsButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const favoriteLocations = getCookie('favorites');
  const favoriteLocationsArray = favoriteLocations
    ? JSON.parse(favoriteLocations)
    : [];

  const [favLocations, setFavLocations] = useState(favoriteLocationsArray);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Favorite Locations"
          onClick={() => setOpenModal(true)}
        >
          <BsHeart />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Favorite Locations</DialogTitle>
        </DialogHeader>

        <div id="results" className="flex flex-col gap-2">
          {favLocations.map((city: any) => (
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

                <Button
                  size="sm"
                  variant="ghost"
                  title="Remove from favorites"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setFavLocations(
                      favLocations.filter(
                        (location: any) => location.name !== city.name
                      )
                    );
                    setCookie(
                      'favorites',
                      JSON.stringify(
                        favLocations.filter(
                          (location: any) => location.name !== city.name
                        )
                      ),
                      999999
                    );
                  }}
                >
                  <Trash />
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function Nav() {
  return (
    <nav className="flex items-center justify-between p-3 px-4">
      <div className="flex items-center gap-2">
        <Image src="/favicon.png" alt="Wethr" width={32} height={32} />
        <Link href="/" className="text-xl font-bold hidden sm:block">
          Wethr
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <GeoLocationButton />
        <SearchCityDialog />
        <FavoriteLocationsButton />
        <ModeToggle />
      </div>
    </nav>
  );
}
