import { Button } from '@/components/ui/button';
import { BsGeoAlt } from 'react-icons/bs';

import { useRouter } from 'next/navigation';

export const GeoLocationButton = () => {
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
