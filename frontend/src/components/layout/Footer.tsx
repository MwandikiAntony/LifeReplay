export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-sm p-4 text-center mt-auto">
      &copy; {new Date().getFullYear()} LifeReplay. All rights reserved.
    </footer>
  );
}