import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, User, LogOut } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const Navbar = ({ isLoggedIn = false, onLogin, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-sm font-mono font-bold text-primary-foreground">T</span>
              </div>
              <span className="font-mono text-xl font-semibold text-foreground">Toolify</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Software</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Software</DropdownMenuItem>
                <DropdownMenuItem>Plugin</DropdownMenuItem>
                <DropdownMenuItem>Script</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="/community" className="text-foreground hover:text-primary transition-smooth">
              Community
            </a>
            <a href="/dashboard" className="text-foreground hover:text-primary transition-smooth">
              Dashboard
            </a>
          </div>

          {/* Auth & Submit */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="premium" size="sm" asChild>
                  <a href="/submit">Submit</a>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <a href="/dashboard">Dashboard</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button variant="outline" onClick={onLogin}>
                Login with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};