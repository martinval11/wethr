import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { BsGeoAlt, BsSearch } from 'react-icons/bs';
import { searchCity } from '@/actions/searchCity';

import { useFormStatus, useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const SearchCityButton = () => {
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
              key={city.country + city.name}
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
