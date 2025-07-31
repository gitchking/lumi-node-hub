import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2 } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  iconURL: string;
  link: string;
  type: "software" | "plugin" | "script";
  uid?: string;
}

interface ToolCardProps {
  tool: Tool;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
}

export const ToolCard = ({ tool, showDelete = false, onDelete }: ToolCardProps) => {
  const handleOpenLink = () => {
    window.open(tool.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group bg-card border border-border rounded-lg p-5 transition-smooth hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {tool.iconURL ? (
                <img 
                  src={tool.iconURL} 
                  alt={`${tool.name} icon`}
                  className="w-8 h-8 object-cover filter brightness-0 invert"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    const sibling = target.nextElementSibling as HTMLElement;
                    target.style.display = 'none';
                    if (sibling) sibling.style.display = 'block';
                  }}
                />
              ) : null}
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-mono text-sm font-bold">
                  {tool.name[0].toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-lg leading-tight">
                {tool.name}
              </h3>
              <span className="inline-block px-2 py-1 mt-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {tool.type}
              </span>
            </div>
          </div>
          
          {showDelete && onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(tool.id)}
              className="opacity-0 group-hover:opacity-100 transition-smooth text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
          {tool.description}
        </p>

        {/* Action Button */}
        <Button 
          variant="minimal" 
          onClick={handleOpenLink}
          className="w-full justify-center group-hover:border-primary group-hover:text-primary"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open Tool
        </Button>
      </div>
    </div>
  );
};