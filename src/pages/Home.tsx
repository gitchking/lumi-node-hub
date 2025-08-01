import { useState, useEffect } from "react";
import { ToolCard, Tool } from "@/components/ToolCard";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockTools: Tool[] = [
  {
    id: "1",
    name: "Figma",
    description: "Collaborative interface design tool for teams to create, prototype, and gather feedback.",
    iconURL: "",
    link: "https://figma.com",
    type: "software"
  },
  {
    id: "2", 
    name: "Prettier",
    description: "Opinionated code formatter that supports many languages and integrates with most editors.",
    iconURL: "",
    link: "https://prettier.io",
    type: "plugin"
  },
  {
    id: "3",
    name: "Auto Deploy",
    description: "Automated deployment script for CI/CD pipelines with zero-downtime deployments.",
    iconURL: "",
    link: "https://github.com/example/auto-deploy",
    type: "script"
  },
  {
    id: "4",
    name: "VS Code",
    description: "Powerful code editor with built-in support for debugging, Git control, and extensions.",
    iconURL: "",
    link: "https://code.visualstudio.com",
    type: "software"
  },
  {
    id: "5",
    name: "ESLint",
    description: "Static analysis tool for identifying problematic patterns in JavaScript code.",
    iconURL: "",
    link: "https://eslint.org",
    type: "plugin"
  },
  {
    id: "6",
    name: "Database Backup",
    description: "Reliable database backup script with compression and cloud storage integration.",
    iconURL: "",
    link: "https://github.com/example/db-backup",
    type: "script"
  }
];

export const Home = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from Firebase
    const loadTools = async () => {
      setIsLoading(true);
      // In a real app, this would be a Firebase call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTools(mockTools);
      setIsLoading(false);
    };

    loadTools();
  }, []);

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-lg p-5 animate-pulse">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-12 h-12 bg-muted rounded-lg"></div>
            <div className="flex-1">
              <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
          <div className="h-11 bg-muted rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-card border-border"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-medium text-foreground">
              Community Tools
              <span className="text-muted-foreground text-xl font-normal ml-3">
                ({filteredTools.length})
              </span>
            </h2>
          </div>

          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No tools found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};