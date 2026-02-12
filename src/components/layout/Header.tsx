import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/start-here', label: 'Start Here' },
  { href: '/lessons', label: 'Lessons' },
  { href: '/practice', label: 'Practice' },
  { href: '/dictionary', label: 'Dictionary' },
  { href: '/culture', label: 'Culture' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedLanguage, setSelectedLanguageId, availableLanguages } = useLanguage();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = () => {
    const returnTo = location.pathname !== '/login' ? location.pathname : '/practice';
    navigate(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const userInitials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user?.email?.[0].toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary font-serif">
            Afrolinguistic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                location.pathname === link.href
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{selectedLanguage.name}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.id}
                  onClick={() => lang.enabled && setSelectedLanguageId(lang.id)}
                  className={cn(
                    !lang.enabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <span className="flex-1">{lang.name}</span>
                  {!lang.enabled && (
                    <span className="text-xs text-muted-foreground ml-2">Coming soon</span>
                  )}
                  {lang.id === selectedLanguage.id && lang.enabled && (
                    <span className="text-primary ml-2">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Button - Desktop */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2" onClick={handleSignIn}>
              <User className="h-4 w-4" />
              Sign In
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-md transition-colors',
                  location.pathname === link.href
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-2">
              {user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    handleSignIn();
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
