import { useToast } from '@/components/ui/use-toast';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const GeoLocationButton = () => {
  const router = useRouter();
  const { toast } = useToast();

  const getLatLng = () => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        router.push(`/city?query=${latitude},${longitude}`);
      });
    } else {
      toast({
        title: 'Error',
        description: 'Sorry. Geolocation is not supported by your browser.',
        variant: 'destructive',
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          onClick={getLatLng}
        >
          <MapPin className="h-[1.2rem] w-[1.2rem]" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Find my location</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
