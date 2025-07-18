import Link from "next/link";

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-primary transition-opacity hover:opacity-80">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      <path d="M20 9V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" />
      <path d="M4 11h16" />
      <path d="M6 11v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-v-8" />
      <path d="M6 15h12" />
    </svg>
    <span>FurnishFlow</span>
  </Link>
);

export default Logo;
