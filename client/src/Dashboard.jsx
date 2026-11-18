import { useEffect, useState } from "react";
import { api } from "./api.js";
import { statusLabel } from "./statuses.js";
import Slider from "./Slider.jsx";
import BouquetCard from "./BouquetCard.jsx";

const slides = [
  { src: '/images/slide-daisies.webp', alt: 'Изображение 1' },
  { src: '/images/slide-peonies.webp', alt: 'Изображение 2' },
  { src: '/images/slide-roses.webp', alt: 'Изображение 3' },
  { src: '/images/slide-tulips.webp', alt: 'Изображение 4' },
]


export default function Dashboard({ user }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    api('/items').then(data => { if (active) setItems(data) })
      .catch(err => { if (active) setError(err.message) })
      .finally(() => { if (active) setLoading(false) })
    
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <h1>Личный кабинет</h1>
      <p>Пользователь: {user.login}</p>
      <Slider slides={slides}/>
      <div className="row">
        <h2>Мои заказы</h2>
        <a href="/">Обновить список</a>
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p>Заказов пока нет. <a href="/new">Добавить заказ</a></p>
      )}
      <div className="grid cols-2">
        {items.map(item => (
          <BouquetCard key={item.id} item={item}>
            <h3>{item.title}</h3>
            <p>{item.quantity}</p>
            <p>{item.pickup_date}</p>
            <p>{item.payment_method}</p>
            <p>Статус: <span className="status-badge">{statusLabel(item.status)}</span></p>
          </BouquetCard>
        ))}
      </div>
    </>
  )
}