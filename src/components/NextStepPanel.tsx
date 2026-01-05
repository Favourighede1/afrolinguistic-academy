import { Link } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NextStepAction {
  label: string;
  href: string;
  icon?: LucideIcon;
  variant?: 'default' | 'outline' | 'secondary';
}

interface NextStepPanelProps {
  title: string;
  description?: string;
  actions: NextStepAction[];
  className?: string;
}

export function NextStepPanel({ title, description, actions, className }: NextStepPanelProps) {
  return (
    <Card className={`border-primary/20 bg-gradient-to-br from-primary/5 to-transparent ${className}`}>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        <div className="flex flex-wrap gap-3">
          {actions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                asChild
                variant={action.variant || (idx === 0 ? 'default' : 'outline')}
                className="gap-2"
              >
                <Link to={action.href}>
                  {Icon && <Icon className="h-4 w-4" />}
                  {action.label}
                  {idx === 0 && <ArrowRight className="h-4 w-4" />}
                </Link>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
