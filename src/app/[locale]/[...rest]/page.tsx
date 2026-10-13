import { notFound } from 'next/navigation';

// Catch unknown paths within a locale so the localized not-found page renders.
export default function CatchAll() {
  notFound();
}
