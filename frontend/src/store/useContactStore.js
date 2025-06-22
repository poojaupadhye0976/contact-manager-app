import { create } from 'zustand';

export const useContactStore = create((set) => ({
  selectedContactId: null,
  isModalOpen: false,
  modalMode: 'view',
  searchQuery: '',
  showFavoritesOnly: false,
  currentPage: 1,
  
  // Actions
  setSelectedContactId: (id) => set({ selectedContactId: id }),
  openModal: (mode) => set({ isModalOpen: true, modalMode: mode }),
  closeModal: () => set({ isModalOpen: false, selectedContactId: null }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleShowFavoritesOnly: () => set((state) => ({ showFavoritesOnly: !state.showFavoritesOnly })),
  setShowFavoritesOnly: (value) => set({ showFavoritesOnly: value }),
  setCurrentPage: (page) => set({ currentPage: page }),
  
}));