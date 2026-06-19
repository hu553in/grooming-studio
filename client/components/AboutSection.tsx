import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';

const features = [
  {
    title: 'комфорт',
    description: 'гигиена без стресса<br />и страха',
    descriptionShort: 'гигиена<br />без стресса<br />и страха',
    color: 'bg-custom-blue',
    image: '/images/about/comfort.webp',
    imageWidth: 261,
    imageHeight: 254,
  },
  {
    title: 'забота',
    description: 'с любовью<br />к каждому хвостику',
    descriptionShort: 'с любовью<br />к каждому<br />хвостику',
    color: 'bg-custom-pink',
    image: '/images/about/care.webp',
    imageWidth: 244,
    imageHeight: 247,
  },
  {
    title: 'качество',
    description: 'только лучшее<br />для питомцев',
    descriptionShort: 'только лучшее<br />для питомцев',
    color: 'bg-custom-coral',
    image: '/images/about/quality.webp',
    imageWidth: 256,
    imageHeight: 256,
  },
  {
    title: 'подход',
    description: 'индивидуальный<br />для каждой собаки',
    descriptionShort: 'индивидуальный<br />для каждой собаки',
    color: 'bg-custom-purple',
    image: '/images/about/approach.webp',
    imageWidth: 261,
    imageHeight: 261,
  },
];

export default function AboutSection() {
  const showShort = useMediaQuery('(max-width: 1023px)');

  return (
    <section id='about' className={cn('py-20', 'bg-white')}>
      <div className={cn('max-w-7xl', 'mx-auto', 'px-6')}>
        <div className={cn('text-center', 'mb-24')}>
          <h2 className={cn('text-4xl', 'font-bold', 'text-custom-dark-pink', 'mb-6')}>
            бережный груминг
          </h2>
          <p
            className={cn(
              'text-custom-dark-blue',
              'max-w-5xl',
              'text-2xl',
              'mx-auto',
              'leading-relaxed'
            )}
          >
            мы создаём пространство, где каждая собака чувствует заботу и внимание. для нас груминг
            — это не просто уход за шерстью, а доверие и любовь к хвостикам. мы работаем бережно и
            без стресса, чтобы питомец уходил красивым, ухоженным и в хорошем настроении
          </p>
        </div>

        <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-6')}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                feature.color,
                'text-custom-dark-blue',
                'relative',
                'p-20',
                'pr-6',
                'lg:p-6',
                'lg:pt-36',
                'rounded-2xl',
                'text-right',
                'lg:text-center',
                'transition-transform',
                'hover:scale-105'
              )}
            >
              <img
                src={feature.image}
                width={feature.imageWidth}
                height={feature.imageHeight}
                alt={feature.title}
                loading='lazy'
                decoding='async'
                className={cn(
                  'mb-4',
                  'absolute',
                  'top-[15%]',
                  'left-[0%]',
                  'lg:-top-12',
                  'lg:left-1/2',
                  'lg:-translate-x-1/2',
                  'w-44',
                  'h-auto'
                )}
              />
              <h3 className={cn('text-2xl', 'font-semibold', 'mb-2')}>{feature.title}</h3>
              <p
                className={cn('text-md', 'leading-relaxed', 'pl-16', 'lg:pl-0')}
                dangerouslySetInnerHTML={{
                  __html: showShort ? feature.descriptionShort : feature.description,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
