import Logo from '@/components/ui/logo';

export default function AboutPage() {
  return (
    <section className="grid place-items-center">
      <div className="max-w-3xl text-center space-y-4">
        <Logo classname="text-6xl" />
        <p className="text-lg leading-relaxed">
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
