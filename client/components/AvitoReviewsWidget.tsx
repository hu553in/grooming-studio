import { AVITO_REVIEWS_PUBLIC_URL } from '@shared/constants/reviews';
import type { FetchState, ReviewItem, ReviewsResponse } from '@shared/types/reviews';
import { Star } from 'lucide-react';
import { useMemo } from 'react';

import { useMetrika } from '@/components/MetrikaProvider';
import { cn } from '@/lib/utils';

function renderStars(score?: number | null) {
  const value = typeof score === 'number' ? score : 0;
  const fullStars = Math.round(value);

  return Array.from({ length: 5 }).map((_, index) => (
    <Star
      key={index}
      className={cn('w-4', 'h-4', fullStars > index ? 'text-custom-dark-pink' : 'text-gray-300')}
      strokeWidth={2}
      fill={fullStars > index ? 'currentColor' : 'none'}
    />
  ));
}

function formatScore(score: number | null) {
  if (typeof score !== 'number') {
    return '—';
  }

  return score.toFixed(1);
}

function pluralize(value: number, few: string, many: string) {
  const mod10 = value % 10;
  const mod100 = value % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return '';
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return few;
  }

  return many;
}

function calculateAverageScore(reviews: ReviewItem[]) {
  return reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;
}

function renderHeader(reviews: ReviewItem[], extLink: (url: string) => void) {
  const score = calculateAverageScore(reviews);

  return (
    <header
      className={cn(
        'border-b',
        'border-[#f1f1f1]',
        'bg-custom-coral',
        'bg-opacity-50',
        'px-6',
        'py-5',
        'flex',
        'flex-col',
        'gap-3'
      )}
    >
      <div className={cn('flex', 'items-baseline', 'gap-3', 'text-custom-dark-pink')}>
        <strong className={cn('text-5xl', 'font-bold')}>{formatScore(score)}</strong>
        <span className={cn('text-lg', 'uppercase', 'tracking-wide')}>/ 5</span>
      </div>
      <p className={cn('text-gray-600', 'text-sm')}>
        На основании {reviews.length} отзыв{pluralize(reviews.length, 'а', 'ов')}
      </p>
      <div>
        <a
          href={AVITO_REVIEWS_PUBLIC_URL}
          onClick={() => {
            extLink(AVITO_REVIEWS_PUBLIC_URL);
          }}
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            'inline-flex',
            'items-center',
            'justify-center',
            'gap-2',
            'bg-custom-dark-pink',
            'text-white',
            'text-sm',
            'font-semibold',
            'px-4',
            'py-2',
            'rounded-full',
            'shadow',
            'transition-opacity',
            'hover:opacity-90'
          )}
        >
          Все отзывы на Авито
        </a>
      </div>
    </header>
  );
}

function WidgetContent({ reviews }: { reviews: ReviewItem[] }) {
  return (
    <div className={cn('flex-1', 'flex', 'flex-col', 'gap-6', 'overflow-hidden')}>
      <div className={cn('flex-1', 'overflow-y-auto', 'pr-1', 'space-y-4')}>
        {reviews.length ? (
          reviews.map(review => <ReviewCard key={review.id} review={review} />)
        ) : (
          <p className={cn('text-sm', 'text-gray-500')}>Пока нет опубликованных отзывов</p>
        )}
      </div>
    </div>
  );
}

function WidgetEmptyContent({
  message,
  showAvitoButton = true,
}: {
  message: string;
  showAvitoButton?: boolean;
}) {
  const { extLink } = useMetrika();

  return (
    <div
      className={cn(
        'flex-1',
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'text-center',
        'gap-4',
        'bg-gray-50',
        'rounded-2xl',
        'border',
        'border-dashed',
        'border-gray-200',
        'p-6'
      )}
    >
      <p className={cn('text-sm', 'text-gray-600')} dangerouslySetInnerHTML={{ __html: message }} />
      {showAvitoButton && (
        <a
          href={AVITO_REVIEWS_PUBLIC_URL}
          onClick={() => {
            extLink(AVITO_REVIEWS_PUBLIC_URL);
          }}
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            'inline-flex',
            'items-center',
            'justify-center',
            'px-4',
            'py-2',
            'text-sm',
            'font-semibold',
            'text-white',
            'bg-custom-dark-pink',
            'rounded-full',
            'shadow-sm',
            'hover:opacity-90'
          )}
        >
          Открыть Авито
        </a>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <article
      className={cn('border', 'border-gray-100', 'rounded-[12px]', 'p-4', 'bg-white', 'shadow-sm')}
    >
      <div className={cn('flex', 'items-center', 'gap-3', 'mb-3')}>
        {review.avatarUrl ? (
          <img
            src={review.avatarUrl}
            alt={review.author}
            className={cn('w-12', 'h-12', 'rounded-full', 'object-cover')}
          />
        ) : (
          <div className={cn('w-12', 'h-12', 'rounded-full', 'bg-gray-100')} />
        )}
        <div className={cn('flex', 'flex-col')}>
          <span className={cn('font-semibold', 'text-gray-900')}>{review.author}</span>
          <span className={cn('text-xs', 'text-gray-500')}>{review.role}</span>
        </div>
        <div className={cn('ml-auto', 'flex', 'items-center', 'gap-1')}>
          {renderStars(review.rating)}
        </div>
      </div>
      {review.text && (
        <p className={cn('text-sm', 'text-gray-700', 'whitespace-pre-line', 'leading-relaxed')}>
          {review.text}
        </p>
      )}
      <footer className={cn('mt-3', 'flex', 'flex-col', 'gap-2')}>
        {review.stageTitle && (
          <span className={cn('text-xs', 'text-gray-500')}>{review.stageTitle}</span>
        )}
        {review.dateLabel && (
          <span className={cn('text-xs', 'text-gray-400')}>{review.dateLabel}</span>
        )}
      </footer>
    </article>
  );
}

export default function AvitoReviewsWidget({
  state,
  data,
}: {
  state: FetchState;
  data: ReviewsResponse | null;
}) {
  const { extLink } = useMetrika();

  const displayedReviews = useMemo(() => {
    if (!data?.reviews.length) {
      return [];
    }

    return data.reviews.filter(
      review => review.itemTitle?.toLowerCase().includes('груминг') ?? false
    );
  }, [data]);

  return (
    <div className={cn('w-full', 'max-w-[600px]', 'h-[800px]', 'flex', 'flex-col')}>
      <div
        className={cn(
          'flex-1',
          'bg-white',
          'rounded-[12px]',
          'border',
          'border-gray-200',
          'shadow-sm',
          'overflow-hidden',
          'flex',
          'flex-col'
        )}
      >
        {renderHeader(displayedReviews, extLink)}

        <div className={cn('flex-1', 'overflow-hidden', 'p-6', 'flex', 'flex-col', 'gap-4')}>
          {state === 'loading' && (
            <WidgetEmptyContent message='Загружаем отзывы...' showAvitoButton={false} />
          )}
          {state === 'error' && (
            <WidgetEmptyContent message={'Не удается загрузить отзывы :(<br>Попробуйте позже.'} />
          )}
          {state === 'success' && data && <WidgetContent reviews={displayedReviews} />}
        </div>
      </div>
    </div>
  );
}
