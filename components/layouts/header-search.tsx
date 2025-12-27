'use client';

import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useEffect, useRef, useState } from 'react';
import { SEARCH_ITEMS } from '@/data';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

const HeaderSearch = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(['Football', 'Gym Trainer']);

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = SEARCH_ITEMS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  // outside click close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const addToHistory = (value: string) => {
    setHistory((prev) =>
      prev.includes(value) ? prev : [value, ...prev].slice(0, 6),
    );
  };

  const highlightMatch = (text: string) => {
    if (!query) return text;
    return text.split(new RegExp(`(${query})`, 'gi')).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-black-10 font-semibold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div ref={containerRef} className="relative hidden lg:block">
      {/* Search icon */}
      <Icon
        name="search"
        height={24}
        width={24}
        className="text-black-8 absolute top-1/2 left-3 -translate-y-1/2"
      />

      {/* Clear input */}
      {query && (
        <button
          onClick={() => setQuery('')}
          className="text-black-8 hover:text-black-10 absolute top-1/2 right-4.5 -translate-y-1/2"
        >
          <Icon name="close" height={24} width={24} />
        </button>
      )}

      <Input
        value={query}
        placeholder="Search sports, coach etc..."
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        className={cn(
          'placeholder:text-black-7 border-black-5 text-black-10 bg-background focus-visible:border-black-5 h-13 w-90 px-4.5 py-3.5 pl-12 text-base! focus-visible:ring-0',
          query && 'pr-10',
        )}
      />

      {/* Dropdown */}
      {open && (
        <div className="bg-background border-black-5 absolute z-50 mt-3 w-full rounded-3xl border p-4.5 shadow-md">
          <ScrollArea className="h-101.75">
            <div className="overflow-y-auto">
              {/* DEFAULT → SEARCH HISTORY */}
              {!query && (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-black-8">Search History </span>
                    {history.length > 0 && (
                      <button
                        onClick={() => setHistory([])}
                        className="text-black-10 hover:text-red cursor-pointer font-medium hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {history.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {history.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="bg-black-5 hover:bg-black-6 text-black-8 h-8 cursor-pointer px-4.5 text-sm font-normal"
                          onClick={() => {
                            setQuery(item);
                            addToHistory(item);
                            setOpen(false);
                          }}
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-black-7 mt-6 text-center">
                      No search history
                    </p>
                  )}
                </>
              )}

              {/* SEARCH RESULT */}
              {query && (
                <>
                  {filteredItems.length ? (
                    <ul className="space-y-3">
                      {filteredItems.map((item) => (
                        <li
                          key={item}
                          className="text-black-7 cursor-pointer"
                          onClick={() => {
                            setQuery(item);
                            addToHistory(item);
                            setOpen(false);
                          }}
                        >
                          {highlightMatch(item)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-black-7 mt-5 text-center">
                      No results found
                    </p>
                  )}
                </>
              )}
            </div>

            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
