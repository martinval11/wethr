import { WeatherView } from '@/components/weatherView';
import { cookies } from 'next/headers';

const getWeather = async () => {
  const city = cookies().get('defaultLocation')?.value || 'London';

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

    if (!response.ok) throw new Error('Error during request.');

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

const Home = async () => {
  const weather = await getWeather();

  return <WeatherView weather={weather} />;
}

export default Home;
