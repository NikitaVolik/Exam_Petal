const imageNames = new Map([
  ["Розовые пионы", "peonies"],
  ["Жёлтые тюльпаны", "tulips"],
  ["Красные розы", "roses"],
  ["Белые ромашки", "daisies"]
])

export default function BouquetCard({ item, children }) {
  const imageName = imageNames.get(item.title)
  const src = imageName ? "/images/" + imageName + ".webp" : null

  return (
    <article className="card stack">
      {src && (
        <img className="card-image" src={src} alt="" loading="lazy" />
      )}
      {children}
    </article>
  )
}