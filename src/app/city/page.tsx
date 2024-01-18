import { WeatherView } from '@/components/weatherView';

const getWeather = async (city: string) => {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY || '',
      'X-RapidAPI-Host': process.env.API_HOST || '',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default async function City({ searchParams }: any) {
  const city = searchParams?.query || 'London';
  const weather = await getWeather(city);

  return <WeatherView weather={weather} defaultLocation={false} />;
}
