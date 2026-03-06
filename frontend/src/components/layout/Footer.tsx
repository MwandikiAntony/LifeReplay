export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-xs sm:text-sm p-3 sm:p-4 text-center mt-auto">
      &copy; {new Date().getFullYear()} LifeReplay. All rights reserved. A product of Capital Solutions.
    </footer>
  );
}