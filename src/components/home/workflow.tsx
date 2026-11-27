import Image from "next/image";
import styles from "./home.module.css";

const brief = [
  { label: "Service", value: "Event branding" },
  { label: "Items", value: "Backdrops, banners and T-shirts" },
  { label: "Finish", value: "To confirm" },
];

function galleryPhoto(time: string) {
  return "/gallery/" + encodeURIComponent(`WhatsApp Image 2026-11-10 at ${time}.jpeg`);
}

export function Workflow() {
  return (
    <section id="trust" className="section-gap" aria-labelledby="workflow-title">
      <div className={`site-grid ${styles.detail} ${styles.firstDetail}`}>
        <figure className={styles.detailPhoto}>
          <Image
            src={galleryPhoto("09.44.43")}
            alt="Pink and white fabric samples with matching multicolour lettering"
            fill
            quality={80}
            sizes="(max-width: 760px) 93vw, 55vw"
          />
        </figure>
        <div className={styles.detailCopy}>
          <h2 id="workflow-title">How to start a project</h2>
          <h3>Send us your project details</h3>
          <p>Tell us what you need printed, the quantity and your deadline. Include the size if you know it.</p>
        </div>
      </div>
      <div className={`site-grid section-gap ${styles.detail} ${styles.secondDetail}`}>
        <div className={styles.detailCopy}>
          <h3>Agree on the materials and finish</h3>
          <p>We’ll go over the options with you before we start production.</p>
        </div>
        <figure className={styles.detailPhoto}>
          <Image
            src={galleryPhoto("09.35.36")}
            alt="Matching red and white printed panels arranged side by side"
            fill
            quality={80}
            sizes="(max-width: 760px) 93vw, 62vw"
          />
        </figure>
      </div>
      <div className={`site-grid section-gap ${styles.tableSection}`}>
        <div className={styles.tableTitle}>
          <h3 id="brief-title">Example project brief</h3>
        </div>
        <div className={styles.tableData}>
          <table className={styles.briefTable} aria-labelledby="brief-title">
            <tbody>
              {brief.map(({ label, value }) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
