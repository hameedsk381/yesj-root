import { cn } from "../lib/utils";

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return (
    <marquee direction="up">
    {children}
    </marquee>
  );
}
