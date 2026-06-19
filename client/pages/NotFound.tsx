import { useEffect } from 'react';

import { cn } from '@/lib/utils';

const NotFound = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Страница не найдена — пёс, ты вымыт';

    let tag = document.querySelector('meta[name="robots"]');
    const prevContent = tag?.getAttribute('content') ?? null;

    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'robots');
      document.head.appendChild(tag);
    }

    tag.setAttribute('content', 'noindex, nofollow');

    return () => {
      document.title = prevTitle;

      if (prevContent === null) {
        tag.remove();
      } else {
        tag.setAttribute('content', prevContent);
      }
    };
  }, []);

  return (
    <div className={cn('min-h-screen', 'flex', 'items-center', 'justify-center')}>
      <div className='text-center'>
        <h1 className={cn('text-4xl', 'text-custom-dark-blue', 'font-bold', 'mb-4')}>404</h1>
        <p className={cn('text-xl', 'text-custom-dark-blue', 'mb-4')}>
          Гав! Страница не найдена...
        </p>
        <a href='/' className={cn('text-custom-dark-blue', 'hover:text-custom-pink', 'underline')}>
          Вернуться на главную
        </a>
      </div>
    </div>
  );
};

export default NotFound;
