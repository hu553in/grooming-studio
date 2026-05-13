import { cn } from '@/lib/utils';

export default function FounderSection() {
  const divider = (
    <svg
      width='calc(min(435px, 100%))'
      height='1'
      viewBox='0 0 435 1'
      fill='none'
      className='mx-auto'
    >
      <path d='M0.5 0.5H434.5' stroke='url(#divider)' strokeLinecap='round' />
      <defs>
        <linearGradient
          id='divider'
          x1='0.5'
          y1='23'
          x2='434.5'
          y2='23'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#DD7DB4' stopOpacity='0' />
          <stop offset='0.1' stopColor='#DD7DB4' />
          <stop offset='0.9' stopColor='#DD7DB4' />
          <stop offset='1' stopColor='#DD7DB4' stopOpacity='0.34' />
        </linearGradient>
      </defs>
    </svg>
  );
  return (
    <section id='founder' className={cn('py-24', 'bg-custom-coral', 'rounded-3xl')}>
      <div className={cn('max-w-7xl', 'mx-auto', 'px-6')}>
        <div
          className={cn('flex', 'flex-col', 'items-center', 'max-w-3xl', 'text-center', 'mx-auto')}
        >
          <div
            className={cn(
              'aspect-square',
              'rounded-full',
              'overflow-hidden',
              'border-[10px]',
              'border-[#DD7DB4]',
              'bg-[#D9D9D9]',
              'mb-12'
            )}
          >
            <img src='/images/founder.webp' alt='Основательница' width={616} height={616} />
          </div>
          <h2 className={cn('text-4xl', 'font-bold', 'text-custom-dark-pink', 'mb-4')}>настя</h2>
          <div className={cn('space-y-12', 'text-2xl', 'leading-relaxed')}>
            <p>грумер и основательница студии</p>
            {divider}
            <p>
              я создаю пространство, где с собакой работают спокойно и внимательно — без спешки и
              давления. Для меня важно не только то, как питомец выглядит после процедуры, но и то,
              как он себя чувствует в процессе
            </p>
            {divider}
            <p className={cn('max-w-2xl', 'mx-auto')}>
              <span className={cn('font-bold', 'text-custom-dark-pink')}>моя цель</span> — сделать
              груминг в Омске безопасным и комфортным для каждой собаки
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
