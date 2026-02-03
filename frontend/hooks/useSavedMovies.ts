"use client";

import { useEffect, useState } from 'react';
import { Movie } from '@/lib/types/movie';

const SAVED_MOVIES_KEY = 'saved_movies';

export const useSavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedMovies();
  }, []);

  const loadSavedMovies = () => {
    try {
      const saved = localStorage.getItem(SAVED_MOVIES_KEY);
      if (saved) {
        setSavedMovies(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveMovie = (movie: Movie) => {
    try {
      const isAlreadySaved = savedMovies.some(m => m.id === movie.id);
      if (isAlreadySaved) {
        return false;
      }

      const newSavedMovies = [...savedMovies, movie];
      localStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(newSavedMovies));
      setSavedMovies(newSavedMovies);
      return true;
    } catch (error) {
      console.error('Error saving movie:', error);
      return false;
    }
  };

  const removeMovie = (movieId: number) => {
    try {
      const newSavedMovies = savedMovies.filter(m => m.id !== movieId);
      localStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(newSavedMovies));
      setSavedMovies(newSavedMovies);
      return true;
    } catch (error) {
      console.error('Error removing movie:', error);
      return false;
    }
  };

  const isMovieSaved = (movieId: number) => {
    return savedMovies.some(m => m.id === movieId);
  };

  return {
    savedMovies,
    loading,
    saveMovie,
    removeMovie,
    isMovieSaved,
    refreshSavedMovies: loadSavedMovies,
  };
};
