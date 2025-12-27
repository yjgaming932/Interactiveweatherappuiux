import { MapPin, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { motion } from 'motion/react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  currentLocation: string;
}

export function SearchBar({ onSearch, currentLocation }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
      setSearchValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <motion.div
        className="relative flex-1"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{
            rotate: isFocused ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </motion.div>
        <Input
          type="text"
          placeholder="Search for a city..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10"
        />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button type="submit" size="icon" variant="default">
          <motion.div
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <MapPin className="w-5 h-5" />
          </motion.div>
        </Button>
      </motion.div>
    </form>
  );
}