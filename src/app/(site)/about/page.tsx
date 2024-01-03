import Logo from '@/components/ui/logo';

export default function AboutPage() {
  return (
    <section className="grid place-items-center">
      <div className="max-w-3xl text-center space-y-4">
        <h2 className="font-bold text-6xl">
          Dev<span className="text-[#D6A567]">Mailer</span>
        </h2>
        <p className="text-lg leading-relaxed text-justify md:text-center">
          Dev mailer is an authentic API service designed to help developers.
          Are you struggling to integrate the mail service into your
          application? Dev mailer is here to solve the problem. Want to send
          emails to your clients? You can count on Dev mailer to help you with
          that too. Dev mailer is a reliable API service that can help you
          integrate your mail.
        </p>
      </div>
    </section>
  );
}
