import { useEffect, useState } from "react";

export default function Slider({slides, interval=3000}) {
  const [index, setIndex] = useState(0)
  const count = slides?.length ?? 0

  useEffect(() => {
    if (count < 2) return

    const timer = setInterval(() => setIndex(current => (current + 1) % count), interval)

    return () => clearInterval(timer)
  }, [count, interval])

  if (!count) return null

  const currentIndex = index % count
  const current = slides[currentIndex]

  return (
    <section className="card stack slider" aria-label="Галерея">
      <img className="slider-image" src={current.src} alt={current.alt} width='1200' height='675' />
      <div className="row">
        <button className="btn" type="button" onClick={() => setIndex(current => (current - 1 + count) % count)}>Назад</button>
        <span>{currentIndex + 1} / {count}</span>
        <button className="btn" type="button" onClick={() => setIndex(current => (current + 1) % count)}>Вперёд</button>
      </div>
    </section>
  )
}
