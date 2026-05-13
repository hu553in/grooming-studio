import { useCallback, useEffect, useMemo } from 'react';

import ServiceModal, { type Service } from '@/components/ServiceModal';
import { useHash } from '@/hooks/use-hash';
import { cn } from '@/lib/utils';

const services: Service[] = [
  {
    id: 'podstrich',
    title: 'подстричь',
    image: '/images/services/podstrich.webp',
    cost: 'от 2000 р.',
    main: 'Аккуратная стрижка шерсти по стандарту или под ваши пожелания: оформим корпус, лапы, голову и ушки. Собака получает ухоженный и опрятный вид, а шерсть остаётся удобной в уходе',
    breeds:
      'Подходит породам: Йоркширский терьер, Ши-тцу, Бишон фризе, Пудель, Мальтезе, Мальтипу, Лабрадудль, Кокапу, Кавапу и т.д.',
    features: [
      'адаптация и приучение к грумингу (при необходимости)',
      'гигиеническая обработка',
      'стрижка когтей',
      'чистка ушек и глаз',
      'купание с профессиональной косметикой',
      'уходовая маска для мягкости и блеска шерсти',
      'сушка и бережный выдув компрессором',
      'стрижка по желанию',
    ],
    costVariations:
      'Стоимость зависит от длины шерсти, наличия колтунов, адаптации к грумингу и пожеланий по стрижке',
  },
  {
    id: 'vychesyat',
    title: 'вычесать',
    image: '/images/services/vychesyat.webp',
    cost: 'от 2000 р.',
    main: 'Тщательное вычесывание подшерстка и удаление колтунов. Процедура помогает коже дышать, снижает линьку и делает шерсть мягкой и аккуратной',
    breeds:
      'Подходит породам: Сиба-ину, Акита-ину, Французский бульдог, Английский бульдог, Корги, Лабрадор, Доберман, Далматинец, Бигль, Бассенджи, Гладкошерстная чихуахуа и т.д.',
    features: [
      'адаптация и приучение к грумингу (при необходимости)',
      'вычёсывание подшерстка',
      'гигиеническая обработка',
      'стрижка когтей',
      'чистка ушек и глаз',
      'купание с профессиональной косметикой',
      'сушка и выдув шерсти компрессором',
      'обработка лап и подушечек',
    ],
    costVariations:
      'Стоимость зависит от породы, объёма подшерстка, степени линьки, наличия колтунов и адаптации к процедурам',
  },
  {
    id: 'poschypat',
    title: 'пощипать',
    image: '/images/services/poschypat.webp',
    cost: 'от 2500 р.',
    main: 'Тримминг позволяет удалить отмерший остевой волос, сохранив здоровый подшерсток и природную защиту шерсти. Процедура улучшает кровообращение, стимулирует рост новой шерсти и помогает питомцу выглядеть аккуратно и ухоженно',
    breeds:
      'Подходит породам: Джек-рассел терьер, Фокстерьер, Вест-хайленд-уайт-терьер, Скотч-терьер, Эрдельтерьер, Такса жесткошёрстная, Гриффон, Шнауцер, Ирландский терьер и др.',
    features: [
      'адаптация и приучение к грумингу (при необходимости)',
      'вычёсывание и распутывание шерсти',
      'гигиеническая обработка',
      'стрижка когтей',
      'чистка ушек и глаз',
      'купание с профессиональной косметикой',
      'уходовая маска для мягкости и блеска шерсти',
      'сушка и бережный выдув компрессором',
    ],
    costVariations:
      'Стоимость зависит от породы, объёма подшерстка, степени линьки, наличия колтунов и адаптации к процедурам',
  },
  {
    id: 'osvezhit',
    title: 'освежить',
    image: '/images/services/osvezhit.webp',
    cost: 'от 1500 р.',
    main: 'Комплексное обновление внешнего вида питомца, после которого шерсть снова выглядит аккуратно и красиво. Другими словами, лёгкий уход между полноценными стрижками',
    breeds: 'Подходит всем короткошёрстным и длинношёрстным собакам',
    features: [
      'адаптация и приучение к грумингу (при необходимости)',
      'окантовка лап, ушей, интимная стрижка',
      'стрижка когтей',
      'чистка ушек и глаз',
      'купание с профессиональной косметикой',
      'уходовая маска для мягкости и блеска шерсти',
      'сушка и бережный выдув компрессором',
      'выбривание шерсти между подушечками',
    ],
    costVariations:
      'Стоимость зависит от длины шерсти, наличия колтунов, адаптации к грумингу и пожеланий по стрижке',
  },
  {
    id: 'pruchit',
    title: 'приучить',
    image: '/images/services/pruchit.webp',
    cost: 'от 1000 р.',
    main: 'Первое знакомство с грумингом проходит мягко и спокойно. Мы бережно адаптируем малыша к уходовым процедурам, чтобы визиты стали привычными и не вызывали страха. Такой опыт помогает сформировать доверие и сделать груминг в будущем лёгким и комфортным',
    breeds: 'Подходит всем',
    features: [
      'адаптация и приучение к грумингу',
      'купание с профессиональной косметикой',
      'стрижка когтей',
      'чистка ушек и глаз',
      'выбривание шерсти между подушечками и окантовка лап',
      'уходовая маска для мягкости и блеска шерсти',
      'сушка и бережный выдув компрессором',
      'вычёсывание',
    ],
    costVariations: 'Стоимость зависит от породы, возраста, объёма шерсти и адаптации щенка',
  },
  {
    id: 'iskupat',
    title: 'искупать',
    image: '/images/services/iskupat.webp',
    cost: 'от 1000 р.',
    main: 'Нежное очищение шерсти и кожи с подбором шампуня по типу шерсти. После купания питомец будет выглядеть свежо и ухоженно',
    breeds: 'Подходит всем',
    features: [
      'купание с профессиональной косметикой',
      'уходовая маска для мягкости и блеска шерсти',
      'сушка и бережный выдув компрессором',
    ],
    costVariations: 'Стоимость зависит от породы, возраста, объёма шерсти и адаптации собаки',
  },
];

export default function ServicesSection() {
  const { hash, updateHash, clearHash } = useHash();

  const selectedService = useMemo(() => {
    if (hash.startsWith('#service-')) {
      const serviceId = hash.split('-')[1];
      const service = services.find(s => s.id === serviceId);
      return service ?? null;
    } else {
      return null;
    }
  }, [hash]);

  const openModal = useCallback(
    (service: Service) => {
      const newHash = `service-${service.id}`;
      updateHash(newHash);
    },
    [updateHash]
  );

  const closeModal = useCallback(() => {
    clearHash();
  }, [clearHash]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // lock page scroll while modal is open
  useEffect(() => {
    if (!selectedService) {
      return;
    }

    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    const prevScrollX = window.scrollX;
    const prevScrollY = window.scrollY;

    const prevHtmlOverflow = htmlEl.style.overflow;
    const prevBodyOverflow = bodyEl.style.overflow;
    const prevBodyPaddingRight = bodyEl.style.paddingRight;

    const headerEl = document.querySelector('header');
    const prevHeaderPaddingRight = headerEl?.style.paddingRight ?? '';

    const supportsGutter =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('scrollbar-gutter: stable');

    const scrollbarWidth = window.innerWidth - htmlEl.clientWidth;

    htmlEl.style.overflow = 'hidden';
    bodyEl.style.overflow = 'hidden';

    if (!supportsGutter && scrollbarWidth > 0) {
      bodyEl.style.paddingRight = `${String(scrollbarWidth)}px`;

      if (headerEl) {
        headerEl.style.paddingRight = `${String(scrollbarWidth)}px`;
      }
    }

    return () => {
      htmlEl.style.overflow = prevHtmlOverflow;
      bodyEl.style.overflow = prevBodyOverflow;
      bodyEl.style.paddingRight = prevBodyPaddingRight;

      if (headerEl) {
        headerEl.style.paddingRight = prevHeaderPaddingRight;
      }

      window.scrollTo(prevScrollX, prevScrollY);
    };
  }, [selectedService]);

  return (
    <>
      <section id='services' className={cn('py-20', 'bg-custom-coral', 'rounded-3xl')}>
        <div className={cn('max-w-7xl', 'mx-auto', 'px-6')}>
          <div className={cn('text-left', 'mb-16')}>
            <h2 className={cn('text-4xl', 'font-bold', 'text-custom-dark-pink', 'mb-4')}>
              услуги для собак
            </h2>
          </div>

          <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-10')}>
            {services.map(service => (
              <div
                key={service.id}
                className={cn(
                  'p-12',
                  'rounded-[64px]',
                  'flex',
                  'flex-col',
                  'justify-between',
                  'items-center',
                  'transition-transform',
                  'hover:scale-105',
                  'bg-cover',
                  'bg-center',
                  'bg-no-repeat',
                  'aspect-[409/523]'
                )}
                style={{
                  backgroundImage: `url('${service.image}')`,
                }}
              >
                <h3
                  className={cn(
                    'text-3xl',
                    'text-custom-dark-blue',
                    'font-semibold',
                    'bg-white/40',
                    'w-full',
                    'text-center',
                    'py-12',
                    'rounded-[64px]',
                    'w-[calc(100%_+_6rem)]',
                    'translate-y-[-3rem]'
                  )}
                >
                  {service.title}
                </h3>

                <button
                  onClick={() => {
                    openModal(service);
                  }}
                  className={cn(
                    'bg-custom-dark-pink',
                    'hover:bg-custom-pink',
                    'text-white',
                    'px-16',
                    'py-4',
                    'rounded-full',
                    'text-xl',
                    'font-medium',
                    'transition-colors',
                    'font-semibold'
                  )}
                >
                  подробнее
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedService && <ServiceModal service={selectedService} closeModal={closeModal} />}
    </>
  );
}
