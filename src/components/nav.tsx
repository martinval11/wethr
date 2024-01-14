import { ModeToggle } from './mode-toggle';

import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BsSearch } from 'react-icons/bs';
import { searchCity } from '@/actions/searchCity';

export function Nav() {
  return (
    <nav className="flex items-center justify-between p-4">
      <b>Wethr</b>
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <BsSearch />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Search</DialogTitle>
            </DialogHeader>
            <form action={searchCity} className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" placeholder="Name of your city" name="city" required />
              </div>
              <Button
                type="submit"
                size="sm"
                className="flex items-center gap-2 px-3"
              >
                <BsSearch />
                <span>Search</span>
              </Button>
            </form>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ModeToggle />
      </div>
    </nav>
  );
}
