import { useState, FormEvent } from 'react';
import { TextField } from '@mui/material';
import SearchResultsModal from './SearchResultsModal';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setModalOpen(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setQuery(''); // Clear the search query when closing the modal
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          label="Search for a movie..."
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 4 }}
        />
      </form>
      {modalOpen && <SearchResultsModal query={query} open={modalOpen} onClose={handleClose} />}
    </>
  );
}