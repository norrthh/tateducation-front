'use client';

import { create } from 'zustand';

interface SiteState {
    footer: boolean;
    setFooter: (footer: boolean) => void;
}

const useSiteStore = create<SiteState>((set) => ({
    footer: true,                  // дефолт тут
    setFooter: (footer) => set({ footer }),
}));

export default useSiteStore;
