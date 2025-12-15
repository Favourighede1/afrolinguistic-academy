import { useState } from 'react';
import { Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AudioButtonProps {
  audioUrl?: string;
  size?: 'sm' | 'default';
  className?: string;
}

export function AudioButton({ audioUrl, size = 'default', className }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasAudio = !!audioUrl;

  const handleClick = () => {
    if (!hasAudio) return;
    // Audio playback would go here once URLs are available
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  const buttonSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  if (!hasAudio) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            disabled
            className={cn(buttonSize, 'opacity-50', className)}
          >
            <Volume2 className={iconSize} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Audio coming soon</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className={cn(
        buttonSize,
        isPlaying && 'bg-primary text-primary-foreground',
        className
      )}
    >
      {isPlaying ? (
        <Volume2 className={cn(iconSize, 'animate-pulse')} />
      ) : (
        <Play className={iconSize} />
      )}
    </Button>
  );
}
