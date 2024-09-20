"use client"
import { useRouter } from 'next/navigation';
export default function Home() {
 const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl mb-8 text-gray-950">Home Page</h1>
      <div className="space-y-4">
        <button
          onClick={() => router.push('/login')}
          className="bg-yellow-500 text-white p-4 hover:bg-yellow-600"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/join')}
          className="bg-purple-500 text-white p-4 hover:bg-purple-600"
        >
          Join
        </button>
      </div>
    </div>
  );
}
