import { CheckCircle2 } from "lucide-react";

const MessagePage = ({
  icon: Icon = CheckCircle2,
  title,
  description,
  email,
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
  iconClassName = "bg-greenbase/10 text-greenbase",
}) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAF6] px-4 py-8">
      <section className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-xl sm:p-9">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${iconClassName}`}
        >
          <Icon size={32} />
        </div>

        <h1 className="mt-5 font-dm text-2xl font-semibold text-primary">
          {title}
        </h1>

        <p className="mt-3 font-dm text-sm leading-6 text-gray">
          {description}
        </p>

        {email && (
          <p className="mt-3 break-all font-dm text-sm font-semibold text-primary">
            {email}
          </p>
        )}

        {primaryButtonText && (
          <button
            type="button"
            onClick={onPrimaryClick}
            className="mt-7 flex w-full items-center justify-center rounded-xl bg-greenbase px-4 py-3 font-dm text-sm font-medium text-white transition hover:opacity-90"
          >
            {primaryButtonText}
          </button>
        )}

        {secondaryButtonText && (
          <button
            type="button"
            onClick={onSecondaryClick}
            className="mt-3 w-full rounded-xl px-4 py-3 font-dm text-sm font-medium text-gray transition hover:bg-gray-50 hover:text-primary"
          >
            {secondaryButtonText}
          </button>
        )}
      </section>
    </main>
  );
};

export default MessagePage;