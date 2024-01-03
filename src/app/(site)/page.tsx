import Image from 'next/image';

import LetterImg from '@/assets/letter.png';
import GrayPlaneImg from '@/assets/gray-plane.svg';
import DarkPlaneImg from '@/assets/dark-plane.svg';
import OrangePlaneImg from '@/assets/orange-plane.svg';

export default function Home() {
  return (
    <section className="flex flex-col mt-10 md:mt-0 md:flex-row gap-4 items-center justify-between px-8">
      <div className="flex flex-col items-center text-center md:items-start md:text-left gap-2 max-w-xl">
        <h2 className="font-bold text-4xl">
          Trouble making forms work on the website?
        </h2>
        <p>
          No worries. Send emails without any issues with Dev Mailer. An API
          built for developers and businesses.
        </p>
        <button className="btn-primary btn w-fit">Get Started</button>
      </div>
      <div className="relative">
        <Image
          src={GrayPlaneImg}
          alt="gray papper plane"
          className="hidden lg:inline-block absolute top-20 -left-8"
          width={40}
          height={40}
        />
        <Image
          src={OrangePlaneImg}
          alt="orange papper plane"
          className="hidden lg:inline-block absolute -top-10 right-28"
          width={40}
          height={40}
        />
        <Image
          src={DarkPlaneImg}
          alt="dark papper plane"
          className="hidden lg:inline-block absolute bottom-20 -left-10"
          width={40}
          height={40}
        />
        <Image src={LetterImg} alt="Mail Letters" width={400} height={400} />
      </div>
    </section>
  );
}
