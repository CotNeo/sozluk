import { create } from 'zustand';
import { ITopic } from '../models/Topic';
import { IEntry } from '../models/Entry';
import { IComment } from '../models/Comment';
import { IUser } from '../models/User';

interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
  isModerator: boolean;
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  
  // Topics state
  topics: ITopic[];
  currentTopic: ITopic | null;
  setTopics: (topics: ITopic[]) => void;
  setCurrentTopic: (topic: ITopic | null) => void;
  addTopic: (topic: ITopic) => void;
  updateTopic: (topic: ITopic) => void;
  
  // Entries state
  entries: IEntry[];
  currentEntry: IEntry | null;
  setEntries: (entries: IEntry[]) => void;
  setCurrentEntry: (entry: IEntry | null) => void;
  addEntry: (entry: IEntry) => void;
  updateEntry: (entry: IEntry) => void;
  
  // Comments state
  comments: IComment[];
  setComments: (comments: IComment[]) => void;
  addComment: (comment: IComment) => void;
  updateComment: (comment: IComment) => void;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const useStore = create<AppState>((set) => ({
  // User state
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  // Topics state
  topics: [],
  currentTopic: null,
  setTopics: (topics) => set({ topics }),
  setCurrentTopic: (topic) => set({ currentTopic: topic }),
  addTopic: (topic) => set((state) => ({ topics: [...state.topics, topic] })),
  updateTopic: (updatedTopic) => set((state) => ({
    topics: state.topics.map((topic) => 
      topic._id === updatedTopic._id ? updatedTopic : topic
    ),
    currentTopic: state.currentTopic?._id === updatedTopic._id ? updatedTopic : state.currentTopic,
  })),
  
  // Entries state
  entries: [],
  currentEntry: null,
  setEntries: (entries) => set({ entries }),
  setCurrentEntry: (entry) => set({ currentEntry: entry }),
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
  updateEntry: (updatedEntry) => set((state) => ({
    entries: state.entries.map((entry) => 
      entry._id === updatedEntry._id ? updatedEntry : entry
    ),
    currentEntry: state.currentEntry?._id === updatedEntry._id ? updatedEntry : state.currentEntry,
  })),
  
  // Comments state
  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
  updateComment: (updatedComment) => set((state) => ({
    comments: state.comments.map((comment) => 
      comment._id === updatedComment._id ? updatedComment : comment
    ),
  })),
  
  // UI state
  isLoading: false,
  error: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export default useStore; 