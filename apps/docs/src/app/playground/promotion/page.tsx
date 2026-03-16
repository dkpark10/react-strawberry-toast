/** @jsxImportSource @emotion/react */

'use client';

import { toast, ToastContainer, type Position } from '@react-strawberry-toast/src';
import { Box } from '@radix-ui/themes';
import { useEffect, useRef } from 'react';
import AssetImage from '@/components/asset-image';

export default function PromotionPage() {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return;
    }

    toast.success('react-strawberry-toast');
    toast.error('react-strawberry-toast');
    toast.info('react-strawberry-toast');
    toast.warn('react-strawberry-toast');

    toast.custom(({ Icons, close }) => (
      <div
        className="font-mono rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200
          text-gray-800 flex p-3 px-4 items-center gap-3 shadow-xl"
      >
        <AssetImage src="/tailwindcss.png" width="20" height="11" className="w-5" alt="tailwind icon" />
        <span className="font-medium">Tailwind CSS Toast</span>
        <button
          type="button"
          onClick={close}
          className="ml-auto bg-gray-200/50 hover:bg-gray-200 rounded-md p-1 transition-colors"
        >
          <Icons.Close />
        </button>
      </div>
    ));

    toast.custom(({ Icons, close }) => (
      <div
        css={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          fontWeight: 500,
        }}
      >
        <span>💅 Emotion Toast</span>
        <button
          type="button"
          onClick={close}
          css={{
            background: 'rgba(21, 19, 19, 0.2)',
            border: 'none',
            borderRadius: 6,
            padding: 4,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'background 0.2s',
            '&:hover': {
              background: 'rgba(20, 15, 15, 0.64)',
            },
          }}
        >
          <Icons.Close />
        </button>
      </div>
    ));

    // Glassmorphism Toast with gradient border
    toast.custom(({ close }) => (
      <div
        css={{
          position: 'relative',
          padding: '1px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
        }}
      >
        <div
          css={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: 15,
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            css={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
            }}
          >
            ✨
          </div>
          <div css={{ flex: 1 }}>
            <div css={{ color: 'white', fontWeight: 600, fontSize: 14 }}>Glassmorphism</div>
            <div css={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Beautiful glass effect toast</div>
          </div>
          <button
            type="button"
            onClick={close}
            css={{
              border: 'none',
              borderRadius: 8,
              padding: 6,
              cursor: 'pointer',
              color: 'white',
              display: 'flex',
              transition: 'all 0.2s',
              '&:hover': {
                background: 'rgba(255,255,255,0.3)',
                transform: 'scale(1.05)',
              },
            }}
          >
            ✕
          </button>
        </div>
      </div>
    ));

    toast.custom(({ close }) => (
      <div
        className="font-sans"
        css={{
          background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: 14,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
          minWidth: 300,
        }}
      >
        <div
          css={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          🍓
        </div>
        <div css={{ flex: 1, minWidth: 0 }}>
          <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span css={{ color: '#00c9ff', fontWeight: 600, fontSize: 13 }}>Strawberry Toast</span>
            <span css={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>now</span>
          </div>
          <div css={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, lineHeight: 1.4 }}>
            New notification arrived! Check your inbox for more details.
          </div>
          <div css={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button
              type="button"
              css={{
                background: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)',
                border: 'none',
                borderRadius: 6,
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: 600,
                color: '#1a1a2e',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0,201,255,0.3)',
                },
              }}
            >
              View
            </button>
            <button
              type="button"
              onClick={close}
              css={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 6,
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                },
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    ));

    toast('Inline Style', {
      style: { color: 'white', backgroundColor: 'black', border: '1px solid white' },
    });

    toast.promise(
      new Promise((resolve) =>
        setTimeout(() => {
          const noop = null;
          resolve(noop);
        }, 2_000),
      ),
      { loading: 'loading', success: 'success', error: 'error' },
    );

    mounted.current = true;
  }, []);

  return (
    <>
      <Box height='100vh' style={{ backgroundColor: 'var(--gray-12)' }} />
      <ToastContainer />
    </>
  );
}

function PromotionPage2() {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return;
    }

    setTimeout(() => {
      toast.success('stacked-toast');
    }, 0);
    setTimeout(() => {
      toast.success('stacked-toast');
    }, 400);
    setTimeout(() => {
      toast.success('stacked-toast');
    }, 800);
    mounted.current = true;
  }, []);

  return (
    <>
      <Box height='100vh' style={{ backgroundColor: 'var(--gray-12)' }} />
      <ToastContainer stack />
    </>
  );
}

function PromotionPage3() {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return;
    }

    toast.success('react-strawberry-toast');
    toast.error('react-strawberry-toast');
    toast.info('react-strawberry-toast');
    toast.warn('react-strawberry-toast');
    toast.promise(
      new Promise((resolve) =>
        setTimeout(() => {
          const noop = null;
          resolve(noop);
        }, 2_000),
      ),
      { loading: 'loading', success: 'success', error: 'error' },
    );

    mounted.current = true;
  }, []);

  return (
    <>
      <Box height='100vh' style={{ backgroundColor: 'var(--gray-12)' }} />
      <ToastContainer />
    </>
  );
}