type Props = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  cta: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function StartCard({ icon, subtitle, cta, onClick, disabled }: Props) {
  return (
    <div className="card-grad rounded-md p-5 text-white shadow-cardHeavy">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-white/15 ring-1 ring-white/25">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-[12px] leading-4 opacity-90">{subtitle}</p>
          <div className="mt-3">
            <button
              type="button"
              onClick={onClick}
              disabled={disabled}
              className={`rounded-sm px-4 py-2 text-[12.5px] font-semibold shadow transition-colors ${
                disabled 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-gray-800 hover:bg-gray-50'
              }`}
            >
              {disabled ? 'Processing...' : cta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
