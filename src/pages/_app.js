import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { DM_Sans } from 'next/font/google'
import { RecoilRoot } from "recoil";

const font = DM_Sans({
  weight: '600',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return <RecoilRoot>
    <div className={font.className}>
    <Navbar/>
    <Component {...pageProps} />
    </div>
    </RecoilRoot>;
}
