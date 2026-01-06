import { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PronunciationPlayButtonProps {
  letter: string;
  className?: string;
}

export function PronunciationPlayButton({ letter, className }: PronunciationPlayButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 1500);
  };

  return (
    <TooltipProvider>
      <Tooltip open={isPlaying}>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={className}
            onClick={handlePlay}
            disabled={isPlaying}
          >
            <Play className={`h-4 w-4 ${isPlaying ? 'text-primary animate-pulse' : ''}`} />
            <span className="sr-only">Play pronunciation for {letter}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs font-medium">
            {isPlaying ? '🔊 Playing...' : 'Play sound'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
