interface InstallExtensionButtonProps {
  className?: string;
}

/**
 * Chrome 확장 프로그램 출시 전까지 사용하는 placeholder 버튼.
 * 클릭 핸들러 없이 자리만 잡아둔다.
 */
export default function InstallExtensionButton({
  className = "",
}: InstallExtensionButtonProps) {
  return (
    <button
      type="button"
      className={`whitespace-nowrap rounded-[999px] bg-[#0A0A0A] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#262626] active:scale-[0.99] focus:outline-none ${className}`}
    >
      Install Chrome Extension
    </button>
  );
}
