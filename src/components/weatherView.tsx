'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Button } from '@/components/ui/button';

import { getCookie } from '@/lib/getCookie';
import { setCookie } from '@/lib/setCookie';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsThermometer, BsDroplet, BsWind } from 'react-icons/bs';
import { FavoriteLocation } from '@/app/types/favorites';

export function WeatherView({ weather }: { weather: any }) {
  const [defaultLocationState, setDefaultLocationState] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const favorites = JSON.parse(getCookie('favorites') || '[]');
  const [favoriteLocations, setFavoriteLocations] = useState(favorites);

  const setFavorite = () => {
    setAddedToFavorites(true);
    const favoriteList = [
      ...JSON.parse(getCookie('favorites') || '[]'),
      {
        name: weather.location.name,
        country: weather.location.country,
      },
    ];

    // find if it exists.

    const favorites = JSON.parse(getCookie('favorites') || '[]');
    const favExist = favorites.find(
      (favorite: FavoriteLocation) => favorite.name === weather.location.name
    );

    if (favExist) {
      // remove it
      setCookie(
        'favorites',
        JSON.stringify(
          favorites.filter(
            (favorite: FavoriteLocation) =>
              favorite.name !== weather.location.name
          )
        ),
        999999
      );

      setAddedToFavorites(false);
      return;
    }

    setCookie('favorites', JSON.stringify(favoriteList), 999999);
  };

  const setDefaultLocation = () => {
    setCookie(
      'defaultLocation',
      `${weather.location.lat},${weather.location.lon}`,
      999999
    );
    setDefaultLocationState(true);
  };

  useEffect(() => {
    const favExist = favoriteLocations.find(
      (favorite: FavoriteLocation) => favorite.name === weather.location.name
    );

    if (favExist) {
      setAddedToFavorites(true);
      return;
    }
  }, []);

  return (
    <main className="p-4 mx-auto flex max-w-[1150px] flex-col items-center gap-2">
      <header className="flex flex-col items-center pt-6 pb-4">
        <h1 className="text-center text-3xl text-balance leading-tight mt-2 tracking-tighter md:text-6xl lg:leading-[1.1]">
          {weather.location.name}
        </h1>
        <h2 className="text-center text-xl leading-tight tracking-tighter mt-3 mb-4 md:text-2xl opacity-75">
          {weather.location.country}
        </h2>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={setFavorite}>
            {addedToFavorites ? (
              <span>Remove from favorites</span>
            ) : (
              <span>Add to favorites</span>
            )}
          </Button>
          {!defaultLocationState &&
          getCookie('defaultLocation') !==
            `${weather.location.lat},${weather.location.lon}` ? (
            <Button variant="secondary" onClick={setDefaultLocation}>
              Set as default location
            </Button>
          ) : null}
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 w-full">
        <Card className="flex flex-col items-center justify-center">
          <CardHeader className="flex flex-col items-center justify-center gap-0">
            <Image
              src={`https:${weather.current.condition.icon}`}
              className="w-10"
              alt="Weather Icon"
              width={64}
              height={64}
            />
            <CardTitle>{weather.current.temp_c}°C</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{weather.current.condition.text}</CardDescription>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="flex flex-col items-center justify-center gap-2">
              <BsThermometer className="w-10 h-10" />
              {weather.forecast.forecastday[0].day.maxtemp_c} /{' '}
              {weather.forecast.forecastday[0].day.mintemp_c}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>ºC Max/Min</CardDescription>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="flex flex-col items-center justify-center gap-2">
              <BsDroplet className="w-10 h-10" />
              {weather.forecast.forecastday[0].day.avghumidity}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Humidity</CardDescription>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="flex flex-col items-center justify-center gap-2">
              <BsWind className="w-10 h-10" />
              {weather.current.wind_kph} km/h
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Wind</CardDescription>
          </CardContent>
        </Card>
      </section>

      <section className="w-full">
        <Carousel className="w-full">
          <CarouselContent>
            {weather.forecast.forecastday[0].hour.map(
              (hour: any, index: any) => (
                <CarouselItem key={index} className="basis-1/8">
                  <Card className="flex flex-col items-center justify-center">
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <span>{hour.time.split(' ')[1]}</span>
                      <Image
                        src={`https:${hour.condition.icon}`}
                        className="w-16"
                        alt="Hour condition icon"
                        width={64}
                        height={64}
                      />

                      <CardDescription>{hour.temp_c}°C</CardDescription>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="mt-4 mb-4 w-full">
        <h2 className="text-xl leading-tight tracking-tighter mt-3 mb-4 md:text-2xl">
          More details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col items-center justify-center gap-2">
                {weather.current.pressure_mb} hPa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Pressure
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col items-center justify-center gap-2">
                {weather.current.feelslike_c} °C
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Feels like
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col items-center justify-center gap-2">
                {weather.forecast.forecastday[0].day.totalprecip_mm} mm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Total Precipitation
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col items-center justify-center gap-2">
                {weather.forecast.forecastday[0].day.avgvis_km} km
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Average Visibility
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
