import { useScript } from 'usehooks-ts';

import { useMetrika } from '@/components/MetrikaContext';
import { cn } from '@/lib/utils';

export default function ReviewsSection() {
  useScript('/scripts/2gis-reviews.js');
  const { extLink } = useMetrika();

  return (
    <section id='reviews' className={cn('mt-20', 'py-20', 'bg-gray-100', 'rounded-t-2xl')}>
      <div className={cn('max-w-7xl', 'mx-auto', 'px-6', 'mb-8', 'lg:mb-12')}>
        <h2 className={cn('text-4xl', 'font-bold', 'text-custom-dark-pink', 'text-left')}>
          отзывы
        </h2>
      </div>

      <div className={cn('max-w-7xl', 'mx-auto', 'justify-items-center', 'items-center')}>
        {/* 2GIS */}
        <iframe
          id='big_light_70000001103444909'
          style={{ border: 0 }}
          className={cn(
            'w-full',
            'max-w-[600px]',
            'h-[800px]',
            'border',
            'border-gray-200',
            'rounded-[12px]',
            'bg-white'
          )}
          title='Отзывы в 2ГИС — пёс, ты вымыт'
          loading='lazy'
          sandbox={cn(
            'allow-modals',
            'allow-forms',
            'allow-scripts',
            'allow-same-origin',
            'allow-popups',
            'allow-top-navigation-by-user-activation'
          )}
        />
      </div>
      <noscript>
        Для просмотра виджета отзывов включите JavaScript. Наш профиль:
        <a
          href='https://go.2gis.com/7WKry'
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => {
            extLink('https://go.2gis.com/7WKry');
          }}
        >
          2ГИС
        </a>
        .
      </noscript>
    </section>
  );
}
