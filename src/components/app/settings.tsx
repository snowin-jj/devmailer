import Image from 'next/image';

export default function SettingsSection() {
  return (
    <section>
      <div className="flex gap-4 items-end">
        <div className="avatar">
          <div className="w-24 rounded">
            <Image
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="avatar"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div>
          <p className="font-bold">Snowin</p>
          <span className="text-base-content">hello.snowin@gmail.com</span>
        </div>
      </div>
    </section>
  );
}
