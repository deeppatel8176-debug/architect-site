"use client";

import { ReactNode } from "react";
import Cursor from "./Cursor";

interface Props {
  children: ReactNode;
}

export default function CursorProvider({
  children,
}: Props) {
  return (
    <>
      <Cursor />
      {children}
    </>
  );
}