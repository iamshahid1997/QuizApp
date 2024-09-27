import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Link href="/quiz/1">Click here to start the quiz</Link>
    </div>
  );
}
