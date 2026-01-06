import { useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

interface RelatedWordPopoverProps {
  word: string;
  pronunciation: string;
  meaning: string;
}

export function RelatedWordPopover({ word, pronunciation, meaning }: RelatedWordPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 font-semibold text-primary hover:text-primary/80 hover:bg-transparent"
        >
          {word}
          <Info className="h-3 w-3 ml-1 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" side="top">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">{word}</span>
            <Badge variant="secondary" className="text-xs">Edo</Badge>
          </div>
          <p className="text-sm text-muted-foreground italic">/{pronunciation}/</p>
          <p className="text-sm font-medium">{meaning}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
