interface InstallExtensionButtonProps {
  className?: string;
}

// Chrome 웹스토어 확장 프로그램 링크
const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ieapfnaljooifelhehhlpkobhndehfla?utm_source=item-share-cb";

/**
 * Chrome 웹스토어의 Kaptik 확장 프로그램 설치 페이지로 이동하는 버튼.
 * 새 탭으로 열어 랜딩페이지 이탈을 막는다.
 */
export default function InstallExtensionButton({
  className = "",
}: InstallExtensionButtonProps) {
  return (
    <a
      href={CHROME_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block whitespace-nowrap rounded-[999px] bg-[#0A0A0A] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#262626] active:scale-[0.99] focus:outline-none ${className}`}
    >
      Install Chrome Extension
    </a>
  );
}
