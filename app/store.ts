import { create } from 'zustand';
import { Project, CustomDates } from './interfaces';

interface EventStore {
    selectedProject: Project;
    selectedPeriod: string;
    currentPage: number;
    customDates?: CustomDates;
    pageTokens: { [key: number]: string };
    setSelectedProject: (project: Project) => void;
    setSelectedPeriod: (period: string) => void;
    setCurrentPage: (page: number) => void;
    setCustomDates: (dates: CustomDates) => void;
    setPageTokenForCurrentPage: (page: number, token: string) => void;
}

export const useEventStore = create<EventStore>((set) => ({
    currentPage: 1,
    customDates: undefined,
    pageTokens: {},
    selectedProject: {
        id: '',
        displayName: '',
        timeZone: { id: 'Asia/Seoul', version: '2025a', $typeName: 'google.type.TimeZone' }
    },
    selectedPeriod: 'Today',
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setCustomDates: (dates: CustomDates) => set({ customDates: dates }),
    setPageTokenForCurrentPage: (page: number, token: string) => set((state) => ({
        pageTokens: { ...state.pageTokens, [page]: token },
    })),
    setSelectedProject: (project) => set({ selectedProject: project }),
    setSelectedPeriod: (period) => set({ selectedPeriod: period }),
}));
