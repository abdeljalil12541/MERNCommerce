// src/context/DrawerContext.js
"use client";
import { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export function DrawerStateProvider({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <DrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawerState() {
  return useContext(DrawerContext);
}