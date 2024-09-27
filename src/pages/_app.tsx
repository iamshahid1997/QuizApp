import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito } from 'next/font/google';
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Apply Nunito font with the specified weights
const nunito = Nunito({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <div className={nunito.className}>
          <Component {...pageProps} />
        </div>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
