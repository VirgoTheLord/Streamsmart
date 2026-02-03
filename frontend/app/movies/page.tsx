import { Film, Search, TrendingUp, Star } from "lucide-react";

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020817] text-black dark:text-white">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10 py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-black font-star tracking-widest">STREAMSMART</h1>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-sm font-raleway hover:text-serenya-primary transition-colors">
              Home
            </a>
            <a href="/movies" className="text-sm font-raleway text-serenya-primary">
              Movies
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Film className="w-16 h-16 text-serenya-accent" />
          </div>
          <h2 className="text-6xl font-black font-star mb-4 tracking-tight">
            DISCOVER MOVIES
          </h2>
          <p className="text-xl text-black/70 dark:text-white/70 font-raleway max-w-2xl mx-auto">
            Browse through our extensive collection of movies, curated just for you.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-serenya-primary/5 border border-serenya-primary/20">
            <Search className="w-12 h-12 text-serenya-primary mb-4" />
            <h3 className="text-2xl font-bold font-raleway mb-2">Smart Search</h3>
            <p className="text-black/70 dark:text-white/70 font-raleway">
              Find exactly what you're looking for with AI-powered search capabilities.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-serenya-accent/5 border border-serenya-accent/20">
            <TrendingUp className="w-12 h-12 text-serenya-accent mb-4" />
            <h3 className="text-2xl font-bold font-raleway mb-2">Trending Now</h3>
            <p className="text-black/70 dark:text-white/70 font-raleway">
              Stay up to date with the latest and most popular movies.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-serenya-dark/5 border border-serenya-dark/20">
            <Star className="w-12 h-12 text-serenya-dark dark:text-serenya-accent mb-4" />
            <h3 className="text-2xl font-bold font-raleway mb-2">Personalized</h3>
            <p className="text-black/70 dark:text-white/70 font-raleway">
              Get recommendations tailored to your unique taste and preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-serenya-primary to-serenya-accent">
            <h3 className="text-4xl font-black font-star text-white mb-4">
              COMING SOON
            </h3>
            <p className="text-lg text-white/90 font-raleway">
              We're building something amazing. Stay tuned for the full movie browsing experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
