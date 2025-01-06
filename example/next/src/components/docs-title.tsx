import { PropsWithChildren } from 'react';

function MainTitle({ children }: PropsWithChildren) {
  return <h1 className="text-4xl font-bold pb-4">{children}</h1>;
}

function SubTitle({ children }: PropsWithChildren) {
  return <h2 className="text-2xl font-semibold pb-2">{children}</h2>;
}

function SsubTitle({ children }: PropsWithChildren) {
  return <h3 className="text-lg font-semibold pb-2">{children}</h3>;
}

function SpaceSm() {
  return <div className="py-1" />;
}

function SpaceMd() {
  return <div className="py-2" />;
}

function SpaceLg() {
  return <div className="py-3" />;
}

export const Docs = {
  MainTitle,
  SubTitle,
  SsubTitle,
  SpaceSm,
  SpaceMd,
  SpaceLg,
};
