import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-bold text-primary font-serif">
              Afrolinguistic
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Making African languages accessible to everyone, one lesson at a time.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/start-here" className="text-muted-foreground hover:text-foreground transition-colors">
                  Start Here
                </Link>
              </li>
              <li>
                <Link to="/lessons" className="text-muted-foreground hover:text-foreground transition-colors">
                  Lessons
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-muted-foreground hover:text-foreground transition-colors">
                  Practice
                </Link>
              </li>
              <li>
                <Link to="/dictionary" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dictionary
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/culture" className="text-muted-foreground hover:text-foreground transition-colors">
                  Culture
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Afrolinguistic Academy. 100% Free Forever.</p>
        </div>
      </div>
    </footer>
  );
}
