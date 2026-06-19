import { lazy, Suspense, useEffect } from 'react';

import AboutSection from '@/components/AboutSection';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { useElementRect } from '@/hooks/use-element-rect';
import { useHash } from '@/hooks/use-hash';
import { cn } from '@/lib/utils';

const FounderSection = lazy(() => import('@/components/FounderSection'));
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const GallerySection = lazy(() => import('@/components/GallerySection'));
const ReviewsSection = lazy(() => import('@/components/ReviewsSection'));
const Footer = lazy(() => import('@/components/Footer'));

const SECTION_ORDER = ['about', 'founder', 'gallery', 'services', 'reviews', 'contacts'] as const;
type SectionId = (typeof SECTION_ORDER)[number];
const SECTION_IDS = new Set<SectionId>(SECTION_ORDER);

const scrollToElement = (element: HTMLElement, headerHeight: number) => {
  const targetTop = element.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth',
  });
};

export default function Index() {
  const { rect: headerRect, setRef: setHeaderRef } = useElementRect();
  const headerHeight = headerRect?.height ?? 0;
  const { hash } = useHash();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!hash) {
      return;
    }

    const sectionId = hash.replace(/^#/, '') as SectionId;
    if (!SECTION_IDS.has(sectionId)) {
      return;
    }

    let frameId: number | null = null;
    let timeoutId: number | null = null;

    const tryScroll = (attemptsLeft: number) => {
      const element = document.getElementById(sectionId);

      if (element) {
        frameId = window.requestAnimationFrame(() => {
          scrollToElement(element, headerHeight);
        });
      } else if (attemptsLeft > 0) {
        timeoutId = window.setTimeout(() => {
          tryScroll(attemptsLeft - 1);
        }, 100);
      }
    };

    tryScroll(50); // 50 attempts with 100ms delay

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [hash, headerHeight]);

  return (
    <div className={cn('min-h-screen', 'bg-white')}>
      <Header setHeaderRef={setHeaderRef} />
      <main>
        <HeroSection headerHeight={headerHeight} />
        <AboutSection />
        <Suspense fallback={null}>
          <FounderSection />
        </Suspense>
        <Suspense fallback={null}>
          <GallerySection />
        </Suspense>
        <Suspense fallback={null}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={null}>
          <ReviewsSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
