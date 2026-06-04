"use client";

export default function AvailableDevices() {
  return (
    <section className="relative px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1360px]">
        <h2
          className="mb-6 text-center text-[clamp(24px,3vw,32px)] font-bold leading-tight tracking-tight"
          style={{
            color: "#0A0A0A",
            letterSpacing: "-0.03em",
          }}
        >
          Available on any devices
        </h2>
        <p
          className="mb-10 text-center text-[15px] leading-relaxed text-[#525252]"
          style={{
            letterSpacing: "-0.01em",
          }}
        >
          Enjoy Kaptik across your favorite screens with a consistent, focused subtitle
          experience.
        </p>

        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
          {/* PC Browser */}
          <div className="flex flex-col items-center text-center md:mt-6">
            <div className="mb-4 w-full max-w-[320px] overflow-hidden rounded-2xl md:max-w-[360px]">
              <img
                src="/available device images/image 5.png"
                alt="Kaptik on PC browser"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
            <p
              className="text-sm font-semibold"
              style={{
                color: "#0A0A0A",
                letterSpacing: "-0.02em",
              }}
            >
              PC Browser
            </p>
          </div>

          {/* Mobile devices (iOS + Android) */}
          <div className="flex items-center gap-6">
            {/* iOS */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 w-full max-w-[130px] overflow-hidden rounded-2xl md:max-w-[140px]">
                <img
                  src="/available device images/ios.png"
                  alt="Kaptik on iOS"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p
                className="text-sm font-semibold"
                style={{
                  color: "#0A0A0A",
                  letterSpacing: "-0.02em",
                }}
              >
                IOS
              </p>
            </div>

            {/* Android */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 w-full max-w-[130px] overflow-hidden rounded-2xl md:max-w-[140px]">
                <img
                  src="/available device images/android.png"
                  alt="Kaptik on Android"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p
                className="text-sm font-semibold"
                style={{
                  color: "#0A0A0A",
                  letterSpacing: "-0.02em",
                }}
              >
                Android
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

