'use client';

import { useEffect, useState } from 'react';

export default function ClientSafeDate() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Show current year if available, otherwise show static year
  return <span>{year ?? 2024}</span>;
} 