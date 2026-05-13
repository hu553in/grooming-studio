import { AVITO_REVIEWS_PUBLIC_URL } from '@shared/constants/reviews';
import type { FetchState, ReviewsErrorResponse, ReviewsResponse } from '@shared/types/reviews';
import { useEffect, useMemo, useState } from 'react';
import { useScript } from 'usehooks-ts';

import AvitoReviewsWidget from '@/components/AvitoReviewsWidget';
import { useMetrika } from '@/components/MetrikaProvider';
import { cn } from '@/lib/utils';

function resolveReviewsEndpoint() {
  const rawBase = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!rawBase) {
    return '/api/reviews/avito';
  }

  const base = rawBase.replace(/\/+$/, '');
  if (!base) {
    return '/api/reviews/avito';
  }

  return `${base}/api/reviews/avito`;
}

const REVIEWS_ENDPOINT = resolveReviewsEndpoint();

export default function ReviewsSection() {
  useScript('/scripts/2gis-reviews.js');
  const { extLink } = useMetrika();

  const [avitoReviewsState, setAvitoReviewsState] = useState<FetchState>('loading');
  const [avitoReviewsData, setAvitoReviewsData] = useState<ReviewsResponse | null>(null);
  const avitoReviewsShown = useMemo(
    () => avitoReviewsState === 'success' || avitoReviewsState === 'loading',
    [avitoReviewsState]
  );

  useEffect(() => {
    const abortController = new AbortController();

    async function load() {
      try {
        setAvitoReviewsState('loading');

        const response = await fetch(REVIEWS_ENDPOINT, {
          signal: abortController.signal,
        });

        const payload = (await response.json()) as ReviewsResponse | ReviewsErrorResponse | null;

        if (!response.ok || !payload || !('reviews' in payload)) {
          throw new Error(
            `Response: ${JSON.stringify(response)}, payload: ${JSON.stringify(payload)}`
          );
        }

        setAvitoReviewsData(payload);
        setAvitoReviewsState('success');
      } catch {
        if (abortController.signal.aborted) {
          return;
        }

        setAvitoReviewsState('error');
      }
    }

    void load();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section id='reviews' className={cn('mt-20', 'py-20', 'bg-gray-100', 'rounded-t-2xl')}>
      <div className={cn('max-w-7xl', 'mx-auto', 'px-6', 'mb-8', 'lg:mb-12')}>
        <h2 className={cn('text-4xl', 'font-bold', 'text-custom-dark-pink', 'text-left')}>
          отзывы
        </h2>
      </div>

      <div
        className={cn(
          'max-w-7xl',
          'mx-auto',
          'grid',
          'grid-cols-1',
          avitoReviewsShown ? 'lg:grid-cols-2' : '',
          'gap-2',
          'lg:gap-6',
          'justify-items-center',
          'items-center'
        )}
      >
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

        {/* Avito */}
        {avitoReviewsShown && (
          <AvitoReviewsWidget state={avitoReviewsState} data={avitoReviewsData} />
        )}
      </div>
      <noscript>
        Для просмотра виджетов отзывов включите JavaScript. Наши профили:
        <a
          href='https://go.2gis.com/7WKry'
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => {
            extLink('https://go.2gis.com/7WKry');
          }}
        >
          2ГИС
        </a>{' '}
        и
        <a
          href={AVITO_REVIEWS_PUBLIC_URL}
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => {
            extLink(AVITO_REVIEWS_PUBLIC_URL);
          }}
        >
          Авито
        </a>
        .
      </noscript>
    </section>
  );
}
