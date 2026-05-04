/**
 * @param {{
 *   title: string,
 *   subtitle?: string
 * }} props
 */
export default function SectionHeading({
  title,
  subtitle,
}) {
  return (
    <div className="text-center mb-8 sm:mb-10">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
        {title}
      </h2>

      {subtitle && (
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
          {subtitle}
        </p>
      )}

      <div className="w-16 h-0.5 bg-accent mx-auto mt-4" />
    </div>
  );
}