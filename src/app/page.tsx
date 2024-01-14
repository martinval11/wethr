import { WeatherView } from '@/components/weatherView';

const getWeather = async () => {
  const url =
    'https://weatherapi-com.p.rapidapi.com/forecast.json?q=London&days=3';
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

export default async function Home() {
  const weather = await getWeather();

  return <WeatherView weather={weather} />;
}
