type Props = {
  onClick?: () => void;
};

export default function StartButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-5 py-3 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 active:scale-95 transition"
    >
      Start
    </button>
  );
}
