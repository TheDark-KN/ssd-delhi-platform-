import { cn } from "@/lib/utils";

type IconVariant = "outlined" | "rounded" | "sharp";

interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  variant?: IconVariant;
  fill?: boolean;
  weight?: number;
  grade?: number;
  opticalSize?: number;
  className?: string;
}

export function MaterialIcon({
  icon,
  variant = "rounded",
  fill = false,
  weight = 400,
  grade = 0,
  opticalSize = 24,
  className,
  ...props
}: MaterialIconProps) {
  const variantClass = `material-symbols-${variant}`;

  return (
    <span
      className={cn(variantClass, className)}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
        ...props.style,
      }}
      {...props}
    >
      {icon}
    </span>
  );
}
