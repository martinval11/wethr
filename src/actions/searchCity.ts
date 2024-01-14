'use server';

import { redirect } from 'next/navigation';

export const searchCity = async (formData: FormData) => {
  const cityName = formData.get('city') as string;

  redirect(`/city?query=${cityName}`);
};
