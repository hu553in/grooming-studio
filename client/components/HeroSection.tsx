import { cn } from '@/lib/utils';

export default function HeroSection({ headerHeight }: { headerHeight: number }) {
  return (
    <section
      id='hero'
      className='bg-custom-blue'
      style={{
        paddingTop: `${String(headerHeight)}px`,
        maskImage: "url('/images/hero.webp')",
        maskSize: 'contain',
        maskPosition: 'center bottom',
        maskRepeat: 'no-repeat',
      }}
    >
      <h1 className='sr-only'>Бережный груминг для собак в Омске — пёс, ты вымыт</h1>
      <img
        src='/images/hero.webp'
        width={1920}
        height={1043}
        alt='Бережный груминг для собак в Омске — пёс, ты вымыт'
        decoding='async'
        fetchPriority='high'
        className={cn('w-full', 'h-full', 'object-cover')}
      />
    </section>
  );
}
