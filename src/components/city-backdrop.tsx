import Image from "next/image";
import styles from "./site.module.css";

export function CityBackdrop({ eager = false }: { eager?: boolean }) {
  return (
    <div className={styles.cityBackdrop} aria-hidden="true">
      <Image
        src="/images/herobanner.png"
        alt=""
        fill
        loading={eager ? "eager" : "lazy"}
        sizes="100vw"
        quality={80}
      />
    </div>
  );
}
